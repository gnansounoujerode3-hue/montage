# Skills Claude installés

Les skills sont installés **dans ce projet** sous `.claude/skills/`, avec copie des fichiers ; aucun `--global` n’a été utilisé. Le dépôt contient maintenant **116 entrées upstream** dans [`skills-lock.json`](skills-lock.json), plus le wrapper local `awesome-claude-skills`. Les 34 ajouts de cette sélection vidéo viennent de dépôts distincts ; la liste n’est pas une affirmation d’exhaustivité mondiale. Les empreintes du verrou couvrent les dossiers de skills copiés.

## Montage vidéo, animation et audio

| Domaine | Skills installés | Source |
|---|---|---|
| HyperFrames | `embedded-captions`, `faceless-explainer`, `figma`, `general-video`, `hyperframes`, `hyperframes-animation`, `hyperframes-audio`, `hyperframes-cli`, `hyperframes-core`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-registry`, `hyperframes-studio`, `media-use`, `motion-graphics`, `music-to-video`, `pr-to-video`, `product-launch-video`, `remotion-to-hyperframes`, `slideshow`, `talking-head-recut` | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) — Apache-2.0 |
| Remotion | `remotion-best-practices`, `remotion-captions`, `remotion-create`, `remotion-docs`, `remotion-interactivity`, `remotion-maps`, `remotion-markup`, `remotion-multimedia`, `remotion-render`, `remotion-saas`, `remotion-studio`, `remotion-upgrade` | [remotion-dev/skills](https://github.com/remotion-dev/skills) — aucun fichier LICENSE repéré dans l’arbre upstream consulté |
| FFmpeg | `ffmpeg-skill` | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) — MIT ; la skill racine inclut aussi scripts, tests, exemples et code MCP du dépôt |
| Montage conversationnel | `video-use` | [browser-use/video-use](https://github.com/browser-use/video-use) — MIT |
| Shorts et workflow de contenu | `video-edit`, `video-human`, `video-repurpose`, `video-script`, `video-setup`, `video-viral` | [Melvynx/video-agent-skill](https://github.com/Melvynx/video-agent-skill) — MIT |
| B-roll animé et détourage | `motion-broll`, `object-separation` | [Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics) — MIT ; le skill de détourage utilise SAM 2 localement |
| Montage vertical | `video-editing` | [nopefallacy/vertical-video-editing-skills](https://github.com/nopefallacy/vertical-video-editing-skills) — MIT ; workflow court-forme basé sur HyperFrames |
| DaVinci Resolve | `davinci-resolve` | [odaiouattara0022-del/davinci-resolve-skill](https://github.com/odaiouattara0022-del/davinci-resolve-skill) — MIT |
| Adobe Premiere Pro | `premiere-pro-mcp`, `edit-premiere-project` | [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) — aucun fichier LICENSE repéré à la racine du dépôt |
| Animation procédurale | `animate` | [cth9191/animate](https://github.com/cth9191/animate) — MIT |
| Transcription et audio | `assemblyai` | [AssemblyAI/assemblyai-skill](https://github.com/AssemblyAI/assemblyai-skill) — aucun fichier LICENSE repéré dans l’arbre upstream consulté |

**Points d’entrée :** commencez par `/hyperframes` pour le workflow HyperFrames, et utilisez `/general-video` pour un montage multi-scènes ou un assemblage. `/video-editing` vise surtout les shorts verticaux à partir d’un script, d’une voix et de médias existants ; `/motion-broll` ajoute des cutaways animés à un talking-head ; `/object-separation` fait un détourage local ; `/davinci-resolve` et les deux skills Premiere décrivent les interactions avec ces éditeurs.

**Prérequis et limites :**

- L’installation d’un skill ne configure pas son runtime. HyperFrames/Remotion peuvent demander Node.js, un navigateur headless et FFmpeg ; Video Use demande FFmpeg et `uv sync` (yt-dlp et une clé ElevenLabs sont facultatifs selon le cas). Les workflows Melvynx peuvent appeler FFmpeg, Remotion, yt-dlp et whisper.cpp. `/video-setup` peut proposer des installations ou permissions : elles ne sont pas appliquées automatiquement.
- `ffmpeg-skill` a été copié comme skill racine (environ 20 Mo avec ses ressources, tests et exemples). Aucun script, serveur MCP ou installateur de ce dépôt n’a été exécuté.
- `motion-broll` requiert notamment Node, Python et FFmpeg ; son script de setup ajoute Playwright/Chromium dans le dossier de travail vidéo. `object-separation` demande Python 3.10+, FFmpeg et les bibliothèques PyTorch/Transformers/OpenCV ; le modèle SAM 2 téléchargé au premier usage peut peser environ **156 à 898 Mo**. Aucun modèle n’a été téléchargé.
- DaVinci Resolve doit être présent et ouvert, avec le scripting externe activé ; FFmpeg est utilisé pour l’analyse audio. Le MCP Premiere doit être installé séparément, avec Premiere et son bridge CEP actifs. Aucun éditeur, serveur MCP ou bridge n’a été installé/configuré ici.
- AssemblyAI nécessite une clé API pour les appels au service. Aucune clé n’a été créée ni ajoutée au dépôt.

## Développement, design et marketing

| Groupe | Skills installés | Source |
|---|---|---|
| Superpowers | `brainstorming`, `diagnosing-superpowers`, `dispatching-parallel-agents`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `requesting-code-review`, `subagent-driven-development`, `systematic-debugging`, `test-driven-development`, `using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`, `writing-skills` | [obra/superpowers](https://github.com/obra/superpowers) — MIT |
| Anthropic | `frontend-design`, `skill-creator` | [anthropics/skills](https://github.com/anthropics/skills) — chaque skill installé contient son propre `LICENSE.txt` |
| Marketing | 50 skills, notamment `ab-testing`, `copywriting`, `cro`, `marketing-plan`, `seo-audit`, `social` et `video` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — MIT |

## Catalogue Awesome Claude Skills

Le dépôt [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) est un **catalogue de liens**, pas un dépôt de skills exécutable. Le wrapper local `.claude/skills/awesome-claude-skills/SKILL.md` sert à consulter et évaluer les ressources ; il ne redistribue pas ce catalogue.

Le catalogue vidéo [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) annonce des centaines de dépôts classés par usage. Il reste une ressource de découverte et n’a pas été installé en bloc, pas plus que [OpenMontage](https://github.com/calesthio/OpenMontage), qui agrège de nombreux pipelines et fichiers de production.

## Sélection et exclusions

La recherche vise une couverture large (workflow créatif, rendu, FFmpeg, B-roll, montage vertical et éditeurs NLE), sans importer aveuglément chaque dépôt découvert. Quelques candidats n’ont pas été installés :

- `Agentchengfeng/chengfeng-videocut-skills` fournit sept entrées chinoises, mais c’est un plugin qui dépend d’un Runtime séparé ; son README demande au moins la version 0.5.9 alors que la version publique consultée indiquait 0.4.11. Le plugin et le Runtime n’ont pas été installés.
- `ZiadAbdelkarim/beat-synced-edit` expose une skill qui appelle des scripts situés à la racine du dépôt. Une installation skill-only ne les embarquerait pas ; le dépôt fait environ 81 Mo. Il n’a pas été copié comme projet complet.
- `Miftahul-Islam-Efaz/Motion-graphics-skill` présente un workflow intéressant, mais son skill fait appel à plusieurs services/MCP externes (par exemple ElevenLabs, Pexels/Pixabay, Firecrawl et Playwright) et aucun fichier LICENSE n’a été repéré dans son dépôt consulté ; il n’a pas été retenu.

D’autres solutions d’édition existent dans le catalogue, notamment des applications entières ou des plugins étroitement couplés à leur serveur local. Elles peuvent être ajoutées séparément après vérification de leurs licences, scripts, dépendances et compatibilité avec l’environnement cible.

## Installation et mise à jour

- Afficher les skills reconnus : `npx skills list --agent claude-code`.
- Mettre à jour ceux qui ont une source distante : `npx skills update`.
- Pour ajouter un skill à ce dépôt : `npx --yes skills add <owner/repo> --skill <nom> --agent claude-code --copy --yes` (plusieurs noms peuvent suivre `--skill`). Ne pas ajouter `--global` pour garder une installation au niveau du projet.

Les skills s’exécutent avec les permissions de l’agent : relisez leurs consignes avant usage. Les logiciels, bibliothèques, modèles, serveurs MCP, médias, comptes et clés API ne sont pas installés par le CLI `skills`. Les licences upstream disponibles sont conservées dans [`.claude/skill-licenses/`](.claude/skill-licenses/).
