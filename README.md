# montage — skills Claude Code

Ce dépôt regroupe des skills **au niveau du projet** dans [`.claude/skills/`](.claude/skills/). Claude Code les découvre lorsque le dépôt est ouvert ; ils ne sont pas installés globalement dans `~/.claude/skills`. Il y a actuellement **116 skills upstream** suivis dans [`skills-lock.json`](skills-lock.json), plus le petit wrapper local Awesome Claude Skills.

## Montage vidéo et audio

La sélection comprend les 21 skills HyperFrames, les 12 skills Remotion, un skill FFmpeg, des workflows pour Video Use, DaVinci Resolve et Adobe Premiere Pro, ainsi que des skills pour les vidéos courtes, les B-roll animés, la séparation de sujets, l’animation procédurale et la transcription audio. Les sources et prérequis sont détaillés dans [`SKILLS.md`](SKILLS.md).

**À savoir :** installer un skill ne configure pas l’outil qu’il décrit. Aucun éditeur, moteur de rendu, bridge MCP, paquet système, modèle IA, compte ou clé API n’a été configuré ici. Selon le workflow, il peut falloir Node.js, HyperFrames/Remotion, Playwright/Chromium, FFmpeg, Python, yt-dlp, whisper.cpp, un modèle SAM 2 volumineux, DaVinci Resolve ou Premiere Pro en cours d’exécution, ainsi que des services et clés API externes. Les skills exécutent des instructions avec les permissions de l’agent : lisez-les avant usage et demandez confirmation avant une installation, un rendu avec écrasement, ou un envoi de médias à un service externe.

La sélection est large, mais **pas exhaustive au sens littéral** : le catalogue communautaire recense des centaines de dépôts. Les catalogues et grands dépôts de production n’ont pas été installés en bloc ; les critères de sélection et quelques exclusions sont documentés dans [`SKILLS.md`](SKILLS.md).

## Autres skills

- Les 15 skills Superpowers pour les workflows de développement.
- Frontend Design et Skill Creator, du dépôt `anthropics/skills`.
- Les 50 skills Marketing de `coreyhaines31/marketingskills`.
- Un wrapper local Awesome Claude Skills pour retrouver le catalogue communautaire ; le catalogue lui-même n’est pas copié comme s’il s’agissait d’un skill exécutable.

[`SKILLS.md`](SKILLS.md) fournit l’index par catégorie, les dépôts sources, les prérequis et les commandes de mise à jour. Les textes de licence upstream disponibles sont conservés dans [`.claude/skill-licenses/`](.claude/skill-licenses/).
