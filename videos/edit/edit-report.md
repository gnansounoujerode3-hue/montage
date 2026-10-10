# Rapport — édition motion design

## Intention

Créer une finition sociale plus éditoriale et inspirée de Pinterest, sans inventer le contenu parlé ni les images. La prise face caméra reste la seule source vidéo et l’audio d’origine reste au premier plan.

## Choix de montage et de design

- **Source :** `source/video-brut.mp4`, copie inchangée de `origin/main:"video brut.mp4"` (27,6 s; 720 × 1280; 25 i/s).
- **Structure :** une seule prise continue jusqu’à 26,000 s. La fin silencieuse commence vers 25,8825 s; la coupe conserve le propos et une courte retombée.
- **Cadrage :** portrait plein cadre conservé, avec une poussée avant lente et régulière d’environ 3,5 %, centrée pour garder le visage dans le cadre.
- **Direction artistique :** papier crème, encre brun-noir et accent terracotta, pour rappeler le décor et les tons du rush; typographie sans-serif + manuscrite.
- **Motion design :** carte « NOTES de studio » animée à l’entrée, badge REC discret, waveform de 54 barres calculée depuis l’audio et progression animée, petit accent étoile. Une carte papier dédiée aux sous-titres occupe la zone basse sans masquer le visage.
- **Finition image :** hausse très légère du contraste et de la saturation, grain à peine perceptible; pas de filtre agressif ni de recadrage abrupt.
- **Rushes / B-roll :** aucun plan additionnel n’a été fourni; aucun stock ni visuel de synthèse n’a été ajouté.
- **Audio :** voix conservée, sans musique ni effet sonore ajouté; fondus de 30 ms. Mesure après export : −14,1 LUFS intégrés, true peak −3,6 dBFS.
- **Sous-titres :** anglais, intégrés graphiquement à l’image et fournis aussi dans `captions-en.srt`. Whisper tiny détecte l’anglais (confiance 0,9995); sa transcription est recoupée avec Vosk small anglais, et les temps sont calés sur les repères par mot de Vosk. Les sorties concordent largement. Aucun son/film n’a été envoyé à un service externe; pas de traduction ou de paraphrase. La transcription reste automatique et non relue par une personne à l’écoute : confirmer le nom « Rockwood » et l’URL avant diffusion.

## Transcription locale (gratuite)

Le média a été converti localement en PCM mono 16 kHz, puis traité hors ligne : `pywhispercpp 1.5.1` avec Whisper tiny multilingue (77 691 713 octets; SHA-1 vérifié `bd577a113a864445d4c299885e0cb97d4ba92b5f`) et `vosk 0.3.45` avec le modèle anglais small 0.15 (archive 41 205 931 octets; SHA-256 `30f26242c4eb449f948e42cb302dd7a686cb29a3423a8367f99ff41780942498`). Les poids ont été téléchargés pour l’exécution locale, sans envoi du rush, et ne sont pas ajoutés au dépôt.

## Export et vérification

| Paramètre | Résultat |
|---|---|
| Fichier | `final.mp4` |
| Vidéo | H.264 High, yuv420p, CRF 17 |
| Image / cadence | 1080 × 1920, 25 i/s, 650 images |
| Durée vidéo | 26,000 s |
| Audio | AAC-LC, 48 kHz, stéréo, 192 kbit/s |
| Durée conteneur | 26,016 s (marge d’encodage AAC) |
| Taille | 20 310 571 octets (≈ 20,3 MB) |
| Loudness / true peak | −14,1 LUFS / −3,6 dBFS |

FFprobe confirme les flux et dimensions; le rendu a été décodé sans erreur. Le contrôle automatisé `.claude/skills/video-editing/scripts/verify-render.mjs` passe (1080 × 1920, H.264, yuv420p, audio présent, durée 26 s ± 0,02 s). La planche de contrôle et les images individuelles sont dans `snapshots/`.
