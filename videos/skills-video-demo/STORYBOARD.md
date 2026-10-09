---
format: 1080x1920
duration: 20s
message: "Du brief à l’export, des skills vidéo composent un film clair et animé."
arc: "Promesse → cadrage → mouvement → assemblage → contrôle et export"
audience: Créateurs curieux des workflows vidéo
mode: autonomous
---

## Frame 1 — Du brief au film

- status: implemented
- src: compositions/frames/01-hook.html
- duration: 3.6s
- transition_in: cut
- scene: Le brief se déplie en titre vertical.
- rules: waterfall-entry, spring-pop-entrance, ambient-glow-bloom

Hook orienté résultat : « DU BRIEF / AU FILM ». Un grand titre prend forme sur un fond papier; un repère « démo locale » situe le projet sans noyer le message dans les noms d’outils. Les mots arrivent en cascade, puis le badge d’index se verrouille. Coupe franche vers le cadrage.

## Frame 2 — Cadrer

- status: implemented
- src: compositions/frames/02-cadrer.html
- duration: 3.8s
- transition_in: cut
- scene: Un cadre 9:16 s’aligne sur ses repères.
- rules: spring-pop-entrance, stat-bars-and-fills, sine-wave-loop

Le format devient visible : cadre vertical, repères de marge et trois paramètres lisibles — « 1080 × 1920 · FR · 20 s ». Le rectangle se construit, les repères s’alignent et un rail de progression indique la place de cette étape. Ce beat prouve l’adaptation de la composition au support.

## Frame 3 — Animer

- status: implemented
- src: compositions/frames/03-animer.html
- duration: 3.8s
- transition_in: cut
- scene: Les mots entrent en rythme et révèlent leur hiérarchie.
- rules: waterfall-entry, spring-pop-entrance, stat-bars-and-fills

La typographie devient l’image : « LES MOTS / PRENNENT / LE RYTHME ». Les mots arrivent avec des vitesses et des directions distinctes; un trait corail s’étire sous le mot-clé. La hiérarchie est portée par le mouvement, pas par un décor ajouté.

## Frame 4 — Assembler

- status: implemented
- src: compositions/frames/04-assembler.html
- duration: 4.6s
- transition_in: cut
- scene: Des clips se rangent sur une timeline, puis une légende se cale dessous.
- rules: cursor-drag, stat-bars-and-fills, waterfall-entry

Une timeline stylisée relie trois opérations — « PLANS », « COUPES », « LÉGENDES ». Un curseur saisit un bloc, le déplace et le dépose sur la piste principale; le repère de lecture avance ensuite sous les éléments. La scène illustre un montage ordonné, sans prétendre montrer de rushes ou d’assets utilisateur.

## Frame 5 — Vérifier et exporter

- status: implemented
- src: compositions/frames/05-exporter.html
- duration: 4.2s
- transition_in: cut
- scene: Les paramètres de sortie se valident avant le carton final.
- rules: spring-pop-entrance, stat-bars-and-fills, ambient-glow-bloom

La progression se remplit jusqu’au repère final; un sceau de contrôle apparaît auprès des paramètres « 20 s · 9:16 · FR ». Le dernier écran conclut « PRÊTE À PARTAGER » avec une signature discrète « HyperFrames · FFmpeg · contrôle local ». Maintenir le carton de fin assez longtemps pour la lecture.

## Contrôle qualité

- Validation HyperFrames sur les cinq scènes et les cinq instants de lecture : lint, runtime, layout et contraste sans erreur ni avertissement.
- Vérification étendue aux transitions : 296 points d’échantillonnage, dont 291 frontières/milieux de tweens; aucun problème de layout ou de lisibilité. L’audit de mouvement dédié n’est pas activé par la commande CLI par défaut.
- Captures de référence : `snapshots/frame-00-at-1.8s.png` à `snapshots/frame-04-at-17.9s.png`; planche : `snapshots/contact-sheet.png`.
- Après approbation de l’aperçu Studio, rendu local créé : `renders/demo-video-fr-vertical.mp4` — H.264, 1080×1920, 30 fps, 20 s, sans piste audio. Contrôlé avec FFprobe; les cinq instants représentatifs du MP4 correspondent aux captures de référence.
