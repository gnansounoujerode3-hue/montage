# Démo des skills vidéo

Composition HyperFrames autonome, verticale (1080 × 1920), d’environ 20 secondes. Cinq scènes montrent une sélection du workflow — cadrage, animation typographique, assemblage de timeline et contrôle local — sans voix, musique, médias externes ni rendu cloud.

## Projet

- `BRIEF.md` — brief confirmé et contraintes.
- `STORYBOARD.md` — plan technique des cinq scènes (pas de checkpoint storyboard, à la demande de l’utilisateur).
- `frame.md` — palette, typographie et règles de composition.
- `index.html` + `compositions/frames/` — composition HyperFrames modulaire.
- `snapshots/contact-sheet.png` — planche de contrôle des cinq scènes; captures individuelles conservées à côté.
- `assets/fonts/` — fontes locales League Gothic et IBM Plex Mono, avec leurs licences OFL.
- `vendor/gsap.min.js` — GSAP 3.14.2 fourni localement pour éviter toute requête CDN.

Aucun asset média ni code d’animation n’est téléchargé au démarrage du film. Les dépendances temporaires de rendu (Chrome, FFmpeg et FFprobe) sont utilisées depuis un cache local et ne sont pas installées dans le système.

## Contrôle et aperçu

Depuis ce dossier, avec HyperFrames 0.8.143 :

```bash
npx hyperframes check --snapshots
npx hyperframes preview --background --no-open
```

## Rendu local approuvé

`renders/demo-video-fr-vertical.mp4` — H.264, 1080 × 1920, 30 fps, 20 secondes, sans piste audio (environ 1,1 Mo). Le fichier a été vérifié avec FFprobe et contrôlé visuellement sur cinq instants représentatifs.

Pour régénérer le MP4 après une modification, approuver d’abord l’aperçu Studio actualisé, puis lancer :

```bash
npx hyperframes render --quality looks --output renders/demo-video-fr-vertical.mp4
```

Le rendu reste local; aucune plateforme externe n’est utilisée.
