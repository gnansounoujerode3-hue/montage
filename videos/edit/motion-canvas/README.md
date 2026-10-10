# Motion Canvas — montage

Éditeur d’animations 2D en TypeScript installé localement pour préparer des titres, transitions et habillages animés. Le projet a été créé avec le gabarit officiel Motion Canvas 3.17.2 et inclut son exporteur FFmpeg.

## Démarrer

```bash
npm install
npm run start
```

Dans Arena, utilise l’aperçu fourni par le serveur; en local, ouvre l’adresse affichée par Vite. Le canevas est configuré en vertical (1080 × 1920, 25 i/s, 4 s) dans `src/project.meta`. La scène d’exemple reste en place : édite `src/scenes/example.tsx` et la liste de scènes dans `src/project.ts`. Utilise les commandes de rendu/export de l’interface Motion Canvas pour produire une séquence ou une vidéo.

## Vérifier

```bash
npm run build
```

Node.js 20.19+ ou 22.12+ est requis. Le rendu et les assets restent locaux; aucun média du montage n’est téléversé.

## Avis de dépendances

`npm audit` signale encore 5 vulnérabilités hautes et 2 modérées dans la chaîne de développement amont (notamment Vite 5 et `fast-glob`/`braces`). Les versions Motion Canvas publiées déclarent une compatibilité Vite 4/5; je n’ai donc pas forcé une version majeure de Vite hors de cette plage. Ce projet sert d’outil local, pas de service de production; évite de rendre le serveur de développement accessible à des réseaux non fiables.
