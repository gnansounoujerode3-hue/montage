# Vidéo brute — édition motion design

## Livrables

- [`final.mp4`](final.mp4) — export vertical social 1080 × 1920, 25 i/s, 26 s.
- [`source/video-brut.mp4`](source/video-brut.mp4) — copie inchangée de l’original `origin/main:"video brut.mp4"`.
- [`edit-report.md`](edit-report.md) — intention, choix visuels et vérification.
- [`edit-decision-list.json`](edit-decision-list.json) — paramètres de montage et d’export.
- [`motion-design/render_overlay.py`](motion-design/render_overlay.py) — générateur local des éléments graphiques animés.
- [`snapshots/contact-sheet.png`](snapshots/contact-sheet.png) — contrôle visuel à cinq moments du rendu.

## Direction artistique

Style éditorial / scrapbook inspiré de Pinterest : papier crème, encre chaude et accents terracotta; carte « NOTES de studio », témoin REC animé, waveform audio avec progression, petit motif dessiné, et léger zoom avant progressif. L’unique rush utilisé est la prise brute fournie : pas de stock, pas de plan inventé, pas d’envoi vidéo à un service externe. Le mix d’origine reste seul, avec un fondu de 30 ms aux bords.

## Sous-titres

**L’export ne contient pas encore de sous-titres verbatim.** Aucun modèle de transcription local n’est disponible dans cet environnement. Pour ne pas inventer de paroles, la transcription reste à fournir; la zone basse est laissée dégagée pour pouvoir les ajouter ensuite à partir d’un `.txt` ou `.srt`. La vidéo n’a été envoyée à aucun service externe.

## Reproduction locale

Le générateur utilise FFmpeg, Pillow, FontTools et Brotli; il réutilise les polices WOFF2 déjà présentes dans ce dépôt.

```bash
python3 -m pip install Pillow fonttools brotli
python3 videos/edit/motion-design/render_overlay.py \
  videos/edit/source/video-brut.mp4 videos/edit/final.mp4
```

FFmpeg doit être sur le `PATH` (ou son chemin passé avec la variable d’environnement `FFMPEG`).
