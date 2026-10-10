# Atelier 3D — Three.js

Compagnon 3D local du projet Motion Canvas, conçu pour préparer des éléments animés verticaux pour le montage. La scène est procédurale : aucun asset ni vidéo source n’est envoyé à un service distant.

## Démarrer

```bash
npm install
npm run start
```

Ouvre l’aperçu Arena ou l’adresse affichée par Vite. La scène est composée dans le navigateur avec Three.js et le WebGL local.

## Exporter

- Le canevas est au format **1080 × 1920**, assorti au montage.
- « Enregistrer » capture une boucle complète à 25 images/s en **WebM sans audio** : 8 secondes à la vitesse par défaut (1×), durée ajustée si tu changes la cadence. Clique ensuite sur le lien de téléchargement.
- Le fichier téléchargé reste local. Pour le convertir en MP4 avec FFmpeg installé localement :

```bash
ffmpeg -i animation.webm -c:v libx264 -pix_fmt yuv420p -movflags +faststart animation.mp4
```

Le serveur Vite est limité à l’hôte local et à l’aperçu Arena (`*.e2b.app`). Ne l’expose pas à un réseau non fiable.

## Vérifier

```bash
npm run build
```

Node.js 20.19+ ou 22.12+ est requis. Les dépendances sont verrouillées dans `package-lock.json` après installation; `node_modules`, `dist` et les exports vidéo sont ignorés par Git.
