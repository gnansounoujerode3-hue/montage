# Rapport de montage et de contrôle qualité

## Intention

Montage naturel et resserré, en gardant le propos complet et le cadrage de la prise face caméra. Aucun B-roll, musique, effet décoratif ou étalonnage appuyé. La finition se limite à la mise à l’échelle propre, à une très légère protection des bords audio et à la suppression de la fin silencieuse.

## Décisions de montage

- **Source :** `source/video-brut.mp4`, copie inchangée de `origin/main:"video brut.mp4"`.
- **Plan :** une prise continue, de 00:00:00.000 à 00:00:26.000; aucun saut au milieu du propos.
- **Fin :** l’analyse de silence a repéré le silence terminal vers 25,8825 s. La coupe à 26,000 s conserve le propos et une courte retombée naturelle, tout en supprimant environ 1,6 s sur les 27,6 s de l’original.
- **Image :** le cadrage portrait existant est conservé; agrandissement Lanczos de 720 × 1280 à 1080 × 1920, sans recadrage.
- **Son :** audio conservé, avec fondus d’entrée et de sortie de 30 ms. Niveau mesuré avant et après : −14,1 LUFS intégrés, true peak −3,6 dBFS; aucune musique ajoutée.
- **Sous-titres :** non inclus. Le modèle Whisper local autorisé n’a pas pu être téléchargé depuis son hébergement inaccessible. Aucun service externe n’a été utilisé. Ajouter les sous-titres après réception d’une transcription ou disponibilité d’un modèle local.

## Export

| Paramètre | Résultat |
|---|---|
| Fichier | `final.mp4` |
| Durée vidéo | 26,000 s |
| Image | 1080 × 1920, 9:16, yuv420p |
| Cadence | 25 i/s, 650 images |
| Vidéo | H.264 High, niveau 4.1, CRF 17 |
| Audio | AAC-LC, 48 kHz, stéréo, 192 kbit/s |
| Taille | 18 914 721 octets (≈ 18,9 MB) |
| Durée du conteneur | 26,016 s (marge d’encodage AAC) |
| Loudness intégré | −14,1 LUFS |
| True peak | −3,6 dBFS |

## Vérification

- Le rendu a été relu par FFprobe : vidéo H.264 1080 × 1920 à 25/1 i/s, 650 images; flux audio AAC présent.
- Le contrôle automatisé `video-editing/scripts/verify-render.mjs` passe : dimensions, codec, format de pixel, audio et durée (26 s ± 0,02 s).
- Une planche de contrôle, ainsi que cinq images individuelles prises à 0,5 s, 6 s, 12,5 s, 19 s et 25,5 s, se trouvent dans `snapshots/`.
