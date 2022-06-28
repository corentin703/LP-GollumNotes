# Gollum Notes

Application de prise de notes avec prise de photos faite par Corentin VÉROT et Nicolas MORIN.

## Fonctionnalités :
- Gestion de comptes utilisateurs (avec jetons JWT)
- Gestion de notes (ajout / modification / suppression) avec photos en ajout seulement


## API Natives utilisées :
- Stockage (avec ```@ionic/storage```) : stockage du jeton JWT
- Caméra (avec ```@capacitor/camera```) : prise de photo + sélection dans la galerie


## Application basée sur une API REST dédiée
- Hébergée sur un compte gratuit Heroku (latence au démarrage de l'application si le conteneur a été mis en veille après inactivité)
- Documentation _swagger_ disponible [ici](https://gollum-notes.herokuapp.com/swagger/index.html).


## Tests

### Code coverage
- Statements   : 55.38% (216 / 390)
- Branches     : 21.21% (14 / 66)
- Functions    : 57.59% (110 / 191)
- Lines        : 52.72% (184 / 349)
