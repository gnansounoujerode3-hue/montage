---
version: 1
name: Atelier vidéo — papier en mouvement
description: Direction frame-first pour une courte démo de skills vidéo : précise, éditoriale, tactile, sans effets de surface superflus.
unit: vertical frame, 1080x1920
principle: une idée lisible par image · le mouvement porte la hiérarchie · les outils restent secondaires
colors:
  paper: "#F4F1DE"
  ink: "#24231F"
  coral: "#A63A27"
  muted: "#685F56"
  rule: "#D9D2C3"
  tile: "#E9E4D7"
typography:
  display:
    fontFamily: "League Gothic"
    weight: 400
    size: 148px
    lineHeight: 0.9
    tracking: "-0.025em"
  body:
    fontFamily: "IBM Plex Mono"
    weight: 400
    size: 34px
    lineHeight: 1.35
  label:
    fontFamily: "IBM Plex Mono"
    weight: 700
    size: 24px
    tracking: "0.07em"
spacing:
  safe-x: 76px
  safe-y: 88px
  scene-gap: 36px
  hairline: 2px
  radius: 0px
components:
  frame-outline:
    border: "2px solid {colors.ink}"
    description: "Un cadre de composition net, rythmé par des repères de coupe plutôt que par un mockup d’appareil."
  coral-marker:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
    description: "L’unique accent chromatique, réservé aux appels visuels et aux validations."
  timeline:
    rule: "2px solid {colors.ink}"
    description: "Pistes rectangulaires, repère de lecture corail, sans fausse interface produit."
---

# Atelier vidéo — papier en mouvement

## Overview

Une petite affiche éditoriale mise en mouvement : le papier crème pose le calme, l’encre donne la structure et le corail ponctue les décisions. La vidéo montre un parcours concret — cadrer, animer, assembler, contrôler — plutôt qu’un inventaire des skills installés.

## Colors

Le fond reste `#F4F1DE`; les titres et repères structurels utilisent `#24231F`. `#A63A27` est l’unique accent, choisi pour rester lisible en petit texte sur le fond clair. `#685F56` sert aux informations secondaires, `#D9D2C3` aux lignes de grille et `#E9E4D7` aux surfaces secondaires. Pas de blanc ou de noir purs, pas de couleur nouvelle par scène.

## Typography

- `League Gothic` 400 porte les titres condensés et les mots à impact.
- `IBM Plex Mono` 400/700 porte les repères, métadonnées et textes secondaires.
- Les deux fontes sont fournies localement au projet; aucune requête de police distante n’est nécessaire.

## Composition Rules

- **Focal :** un titre condensé occupant environ 60–80 % de la largeur utile.
- **Ancrages :** contenu aligné au bord gauche et au rail supérieur; métadonnées fixées aux marges; timeline dans la zone inférieure.
- **Soutien :** repères de coupe, pistes, index et chiffres uniquement lorsqu’ils expliquent une étape réelle.
- **Fond :** papier légèrement texturé par une grille fine et des repères de montage; un seul halo/marker corail animé par scène.
- **Mouvement :** cascades typographiques courtes, révélations sobres et progressions en scale; pas de rebond décoratif, de défilement automatique ni de gradient de texte.

## Do's and Don'ts

- Garder une idée principale et peu de mots par beat; conserver au moins une seconde de lecture sur le carton final.
- Utiliser des coupes franches entre les cinq scènes pour un rythme net.
- Ne pas ajouter de logos, d’images stock, de voix, de musique, d’effets sonores ou de fausses métriques.
- Ne pas suggérer que toutes les compétences installées sont utilisées; les scènes montrent seulement une sélection représentative.
