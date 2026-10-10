# Rapport — édition motion design

## Intention

Créer une finition sociale plus éditoriale et inspirée de Pinterest, sans inventer le contenu parlé ni les images. La prise face caméra reste la seule source vidéo et l’audio d’origine reste au premier plan.

## Choix de montage et de design

- **Source :** `source/video-brut.mp4`, copie inchangée de `origin/main:"video brut.mp4"` (27,6 s; 720 × 1280; 25 i/s).
- **Structure :** une seule prise continue jusqu’à 26,000 s. La fin silencieuse commence vers 25,8825 s; la coupe conserve le propos et une courte retombée.
- **Cadrage :** portrait plein cadre conservé, avec une poussée avant lente et régulière d’environ 3,5 %, centrée pour garder le visage dans le cadre.
- **Direction artistique :** papier crème, encre brun-noir et accent terracotta, pour rappeler le décor et les tons du rush; typographie sans-serif + manuscrite.
- **Motion design :** carte « NOTES de studio » animée à l’entrée, badge REC discret, waveform de 54 barres calculée depuis l’audio et progression animée, petit accent étoile. La partie basse reste dégagée pour de futurs sous-titres.
- **Finition image :** hausse très légère du contraste et de la saturation, grain à peine perceptible; pas de filtre agressif ni de recadrage abrupt.
- **Rushes / B-roll :** aucun plan additionnel n’a été fourni; aucun stock ni visuel de synthèse n’a été ajouté.
- **Audio :** voix conservée, sans musique ni effet sonore ajouté; fondus de 30 ms. Mesure après export : −14,1 LUFS intégrés, true peak −3,6 dBFS.
- **Sous-titres :** non inclus à ce stade. Il n’y a pas de moteur ASR/modèle local accessible; aucune transcription n’a été inventée et aucun service externe n’a reçu la vidéo. Ajouter un `.txt` ou `.srt` permettra de créer une piste fidèle.

## Export et vérification

| Paramètre | Résultat |
|---|---|
| Fichier | `final.mp4` |
| Vidéo | H.264 High, yuv420p, CRF 17 |
| Image / cadence | 1080 × 1920, 25 i/s, 650 images |
| Durée vidéo | 26,000 s |
| Audio | AAC-LC, 48 kHz, stéréo, 192 kbit/s |
| Durée conteneur | 26,016 s (marge d’encodage AAC) |
| Taille | 20 777 976 octets (≈ 20,8 MB) |
| Loudness / true peak | −14,1 LUFS / −3,6 dBFS |

FFprobe confirme les flux et dimensions; le rendu a été décodé sans erreur. Le contrôle automatisé `video-editing/scripts/verify-render.mjs` passe (1080 × 1920, H.264, yuv420p, audio présent, durée 26 s ± 0,02 s). La planche de contrôle et les images individuelles sont dans `snapshots/`.
