#!/usr/bin/env python3
"""Render a small, deterministic editorial overlay for the raw talking-head take.

The source clip stays full-frame. The overlay is generated as a PNG stream and
composited with FFmpeg; no browser, external footage, or hosted service is used.
Requires Pillow + fontTools (WOFF2 support via brotli), and a local FFmpeg binary.
"""
from __future__ import annotations

import io
import math
import os
import shutil
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT, FPS = 1080, 1920, 25
DURATION = 26.0
FRAME_COUNT = int(DURATION * FPS)
BARS = 54

ROOT = Path(__file__).resolve().parents[3]
FONT_SOURCES = {
    "sans": ROOT / ".claude/skills/hyperframes-creative/frame-presets/code-editorial/fonts/Inter-700.woff2",
    "mono": ROOT / ".claude/skills/hyperframes-creative/frame-presets/code-editorial/fonts/JetBrainsMono-400.woff2",
    "hand": ROOT / ".claude/skills/talking-head-recut/assets/fonts/Caveat-700-latin.woff2",
}

# Vibe-Life warm editorial palette, chosen to echo the brown backdrop, blue shirt,
# cream top and wood table in this source shot.
INK = (31, 27, 25, 255)
PAPER = (247, 242, 226, 246)
PEACH = (232, 140, 90, 255)
MUTED = (108, 82, 75, 185)


def font_ttf(src: Path, name: str) -> Path:
    cache = Path(tempfile.gettempdir()) / "montage-edit-fonts"
    cache.mkdir(parents=True, exist_ok=True)
    dest = cache / f"{name}.ttf"
    if not dest.exists() or dest.stat().st_mtime < src.stat().st_mtime:
        font = TTFont(str(src))
        font.flavor = None
        font.save(str(dest))
    return dest


def ease_out(x: float) -> float:
    x = min(1.0, max(0.0, x))
    return 1.0 - (1.0 - x) ** 3


def audio_waveform(source: Path, ffmpeg: str) -> list[float]:
    # A compact local PCM analysis creates a 54-bar waveform; audio never leaves disk.
    cmd = [
        ffmpeg, "-hide_banner", "-loglevel", "error", "-i", str(source),
        "-vn", "-ac", "1", "-ar", "4000", "-t", str(DURATION),
        "-f", "f32le", "pipe:1",
    ]
    result = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    usable = len(result.stdout) - len(result.stdout) % 4
    samples = struct.unpack(f"<{usable // 4}f", result.stdout[:usable]) if usable else ()
    if not samples:
        return [0.0] * BARS

    levels: list[float] = []
    for i in range(BARS):
        start = round(i * len(samples) / BARS)
        end = max(start + 1, round((i + 1) * len(samples) / BARS))
        chunk = samples[start:end]
        rms = math.sqrt(sum(value * value for value in chunk) / len(chunk))
        levels.append(rms)
    reference = sorted(levels)[max(0, math.ceil(len(levels) * 0.90) - 1)] or 1.0
    return [min(1.0, level / reference) for level in levels]


def rounded_card(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], radius: int = 26) -> None:
    x1, y1, x2, y2 = box
    # Flat, offset ink shadow — no soft/glassy UI look.
    draw.rounded_rectangle((x1 + 6, y1 + 7, x2 + 6, y2 + 7), radius=radius,
                           fill=(20, 18, 16, 90))
    draw.rounded_rectangle(box, radius=radius, fill=PAPER, outline=INK, width=3)


def spaced_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str,
                font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int],
                tracking: int = 1) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += int(draw.textlength(char, font=font)) + tracking


def draw_sparkle(draw: ImageDraw.ImageDraw, cx: float, cy: float, radius: float,
                 phase: float, alpha: int) -> None:
    inner = radius * 0.24
    points = []
    for i in range(8):
        angle = -math.pi / 2 + phase + i * math.pi / 4
        r = radius if i % 2 == 0 else inner
        points.append((cx + math.cos(angle) * r, cy + math.sin(angle) * r))
    fill = (PEACH[0], PEACH[1], PEACH[2], alpha)
    outline = (INK[0], INK[1], INK[2], min(alpha, 220))
    draw.polygon(points, fill=fill)
    draw.line(points + [points[0]], fill=outline, width=3, joint="curve")


def make_frame(t: float, fonts: dict[str, ImageFont.FreeTypeFont], levels: list[float]) -> Image.Image:
    image = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image, "RGBA")

    # Intro sticker: the label settles into the upper negative space, above the face.
    # It identifies the edit as a studio take; it does not invent spoken content.
    card_w, card_h = 462, 132
    enter = ease_out(t / 0.52)
    card_x = round(62 - card_w * (1.0 - enter))
    card_y = 62
    rounded_card(draw, (card_x, card_y, card_x + card_w, card_y + card_h), radius=27)

    # Tiny peach registration dot + mono take label.
    draw.ellipse((card_x + 22, card_y + 18, card_x + 36, card_y + 32), fill=PEACH)
    spaced_text(draw, (card_x + 46, card_y + 17), "PRISE 01", fonts["mono"], INK, tracking=2)
    draw.text((card_x + 22, card_y + 42), "NOTES", font=fonts["sans"], fill=INK)
    draw.text((card_x + 202, card_y + 49), "de studio", font=fonts["hand"], fill=PEACH)
    # Hand-drawn underline beneath the handwritten accent.
    underline_y = card_y + 106
    draw.line([(card_x + 204, underline_y), (card_x + 266, underline_y + 2),
               (card_x + 335, underline_y - 1), (card_x + 413, underline_y + 1)],
              fill=(PEACH[0], PEACH[1], PEACH[2], 220), width=4, joint="curve")

    # Recording tag. Gentle pulse only; no extra music or sound effects are added.
    rec_x, rec_y, rec_w, rec_h = 844, 72, 174, 86
    float_y = round(2 * math.sin(2 * math.pi * t / 4.8))
    rounded_card(draw, (rec_x, rec_y + float_y, rec_x + rec_w, rec_y + rec_h + float_y), radius=25)
    pulse = 0.72 + 0.28 * (0.5 + 0.5 * math.sin(2 * math.pi * t / 1.8))
    dot_alpha = int(160 + 95 * pulse)
    draw.ellipse((rec_x + 20, rec_y + 23 + float_y, rec_x + 46, rec_y + 49 + float_y),
                 fill=(PEACH[0], PEACH[1], PEACH[2], dot_alpha), outline=INK, width=2)
    draw.text((rec_x + 59, rec_y + 13 + float_y), "REC", font=fonts["sans"], fill=INK)
    spaced_text(draw, (rec_x + 60, rec_y + 53 + float_y), "SOURCE", fonts["mono"], MUTED, tracking=1)

    # Audio-reactive editorial waveform card — directly derived from the source audio.
    wave_x, wave_y, wave_w, wave_h = 62, 218, 956, 112
    wave_enter = ease_out(max(0.0, (t - 0.18) / 0.48))
    wave_alpha = int(246 * wave_enter)
    draw.rounded_rectangle((wave_x + 5, wave_y + 6, wave_x + wave_w + 5, wave_y + wave_h + 6),
                           radius=24, fill=(20, 18, 16, int(72 * wave_enter)))
    draw.rounded_rectangle((wave_x, wave_y, wave_x + wave_w, wave_y + wave_h), radius=24,
                           fill=(PAPER[0], PAPER[1], PAPER[2], wave_alpha),
                           outline=(INK[0], INK[1], INK[2], wave_alpha), width=3)
    spaced_text(draw, (wave_x + 24, wave_y + 12), "VOIX / 01", fonts["mono"],
                (INK[0], INK[1], INK[2], wave_alpha), tracking=1)
    elapsed = max(0, min(int(t), 26))
    duration_label = f"{elapsed:02d} / 26 S"
    label_width = int(draw.textlength(duration_label, font=fonts["mono"]))
    draw.text((wave_x + wave_w - label_width - 25, wave_y + 11), duration_label,
              font=fonts["mono"], fill=(INK[0], INK[1], INK[2], wave_alpha))

    # 54 rounded bars. The active segment is peach; the playhead follows the edit.
    bars_left, bars_right = wave_x + 28, wave_x + wave_w - 29
    bars_width = bars_right - bars_left
    gap = 7
    bar_w = max(5, (bars_width - gap * (BARS - 1)) // BARS)
    actual_width = bar_w * BARS + gap * (BARS - 1)
    bars_left += (bars_width - actual_width) // 2
    baseline = wave_y + 87
    progress = min(1.0, max(0.0, t / DURATION))
    for i, amplitude in enumerate(levels):
        center_t = (i + 0.5) / BARS * DURATION
        height = 7 + round(34 * math.sqrt(amplitude))
        x = bars_left + i * (bar_w + gap)
        color = (PEACH[0], PEACH[1], PEACH[2], wave_alpha) if center_t <= t else (91, 65, 59, int(100 * wave_enter))
        draw.rounded_rectangle((x, baseline - height, x + bar_w, baseline),
                               radius=max(2, bar_w // 2), fill=color)

    # Progress hairline and a little moving marker under the waveform.
    line_y = wave_y + wave_h - 9
    line_l, line_r = wave_x + 22, wave_x + wave_w - 22
    draw.rounded_rectangle((line_l, line_y, line_r, line_y + 3), radius=2,
                           fill=(91, 65, 59, int(90 * wave_enter)))
    head_x = round(line_l + (line_r - line_l) * progress)
    draw.rounded_rectangle((line_l, line_y, max(line_l + 2, head_x), line_y + 3), radius=2,
                           fill=(PEACH[0], PEACH[1], PEACH[2], wave_alpha))
    draw.ellipse((head_x - 8, line_y - 5, head_x + 8, line_y + 11),
                 fill=(PAPER[0], PAPER[1], PAPER[2], wave_alpha),
                 outline=(INK[0], INK[1], INK[2], wave_alpha), width=2)

    # A small moving paper-star in the upper-right negative space, away from face and mic.
    star_alpha = int(205 * wave_enter)
    star_radius = 22 + 2 * math.sin(2 * math.pi * t / 3.6)
    draw_sparkle(draw, 1001, 366, star_radius, 0.10 * math.sin(2 * math.pi * t / 4.2), star_alpha)
    draw_sparkle(draw, 76, 375, 11, 0.08 * math.sin(2 * math.pi * t / 5.1), int(145 * wave_enter))

    return image


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: render_overlay.py <source.mp4> <output.mp4>", file=sys.stderr)
        return 2
    source = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve()
    if not source.is_file():
        print(f"Source not found: {source}", file=sys.stderr)
        return 2
    output.parent.mkdir(parents=True, exist_ok=True)

    ffmpeg = os.environ.get("FFMPEG") or shutil.which("ffmpeg")
    if not ffmpeg:
        print("FFmpeg was not found; set FFMPEG to a local binary.", file=sys.stderr)
        return 2

    fonts = {
        "sans": ImageFont.truetype(str(font_ttf(FONT_SOURCES["sans"], "Inter-700")), 39),
        "mono": ImageFont.truetype(str(font_ttf(FONT_SOURCES["mono"], "JetBrainsMono-400")), 16),
        "hand": ImageFont.truetype(str(font_ttf(FONT_SOURCES["hand"], "Caveat-700")), 47),
    }
    levels = audio_waveform(source, ffmpeg)

    vf = (
        "[0:v]trim=duration=26.0,setpts=PTS-STARTPTS,"
        "scale=1080:1920:flags=lanczos,"
        "zoompan=z='1+0.035*(0.5-0.5*cos(PI*on/649))':"
        "x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1080x1920:fps=25,"
        "eq=contrast=1.015:saturation=1.04:brightness=0.003,"
        "noise=alls=1:allf=t+u,format=rgba[base];"
        "[base][1:v]overlay=shortest=1:eof_action=pass:format=auto,"
        "format=yuv420p[v]"
    )
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
        "-i", str(source),
        "-f", "image2pipe", "-vcodec", "png", "-framerate", str(FPS), "-i", "pipe:0",
        "-filter_complex", vf, "-map", "[v]", "-map", "0:a:0",
        "-t", str(DURATION), "-r", str(FPS),
        "-af", "afade=t=in:st=0:d=0.03,afade=t=out:st=25.97:d=0.03",
        "-c:v", "libx264", "-preset", "slow", "-crf", "17",
        "-profile:v", "high", "-level", "4.1",
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", str(output),
    ]
    proc = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert proc.stdin is not None
    try:
        for frame_no in range(FRAME_COUNT):
            t = frame_no / FPS
            frame = make_frame(t, fonts, levels)
            buffer = io.BytesIO()
            frame.save(buffer, format="PNG", compress_level=1)
            proc.stdin.write(buffer.getvalue())
            if frame_no % 125 == 0:
                print(f"overlay {frame_no:03d}/{FRAME_COUNT}", file=sys.stderr)
        proc.stdin.close()
    except BrokenPipeError:
        proc.stdin.close()
        return proc.wait() or 1
    return proc.wait()


if __name__ == "__main__":
    raise SystemExit(main())
