# Vidéo brute — montage final

## Livrables

- [`final.mp4`](final.mp4) — export vertical social, H.264/AAC, 1080 × 1920, 25 i/s, 26 s.
- [`source/video-brut.mp4`](source/video-brut.mp4) — copie de l’original `origin/main:"video brut.mp4"` (inchangée).
- [`edit-report.md`](edit-report.md) — décisions de montage, caractéristiques et contrôle qualité.
- [`edit-decision-list.json`](edit-decision-list.json) — segment source conservé et paramètres de sortie.
- [`snapshots/contact-sheet.png`](snapshots/contact-sheet.png) — contrôle visuel sur cinq images du rendu; les images individuelles sont dans le même dossier.

## Sous-titres

**Aucun sous-titre n’est incrusté dans cet export.** La transcription locale Whisper n’a pas pu être préparée, car le modèle officiel est hébergé sur un domaine inaccessible dans cet environnement. La vidéo n’a été envoyée à aucun service externe. Les sous-titres pourront être ajoutés à partir d’une transcription fournie ou lorsqu’un modèle local sera disponible.

## Reproduction du rendu

Commande FFmpeg équivalente, depuis la racine du dépôt :

```bash
ffmpeg -y -hide_banner -i videos/edit/source/video-brut.mp4 \
  -t 26.0 \
  -vf 'scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p' \
  -af 'afade=t=in:st=0:d=0.03,afade=t=out:st=25.97:d=0.03' \
  -r 25 \
  -c:v libx264 -preset slow -crf 17 -profile:v high -level 4.1 \
  -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -movflags +faststart videos/edit/final.mp4
```
