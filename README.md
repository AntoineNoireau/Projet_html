
# RecipeDle

## Description du projet

**RecipeDle** est un jeu inspiré par Motus, où les ingrédients remplacent les lettres et les recettes les mots. Le jeu propose deux modes :
- **Mode 1** : Le nom de la recette est donné, et le joueur doit retrouver les ingrédients qui composent cette recette dans le bon ordre.
- **Mode 2** : Les ingrédients sont fournis dans l'ordre correct, et le joueur doit deviner le nom de la recette.

## Équipe

- **Pierrick Jouron** : Gestion de la base de données, node.js, ajout de recettes.
- **Thomas Creusier** : Développement du premier mode de jeu, gestion de la section vidéo.
- **Robin Mercier** : Développement Front-end.
- **Antoine Noireau** : Développement du deuxième mode de jeu, consultation des recettes, Front-end.

## Technologies utilisées

- JavaScript
- Node.js
- Express.js
- MySQL
- YouTube API

## Installation et démarrage

### Prérequis

- **Visual Studio Code** : [Télécharger et installer Visual Studio Code](https://code.visualstudio.com/)

### Configuration de l'environnement de développement

1. **Installer l'extension Git** :
   - Ouvrez Visual Studio Code, allez à l'onglet "Extensions", recherchez "Git" et installez l'extension.

2. **Clonage du dépôt Git** :
   - Ouvrez le terminal intégré (Terminal > Nouveau terminal).
   - Tapez la commande suivante :
     ```
     git clone [URL_DU_DÉPÔT_GIT]
     ```
   - Remplacez `[URL_DU_DÉPÔT_GIT]` par l'URL de votre dépôt Git.

### Installation de XAMPP

- Téléchargez et installez XAMPP depuis [le site officiel de XAMPP](https://www.apachefriends.org/index.html).
- Démarrez les serveurs Apache et MySQL via le panneau de contrôle de XAMPP.

### Configuration de la base de données

- Ouvrez phpMyAdmin via XAMPP, créez une base de données nommée `foodus`.
- Importez le fichier de base de données depuis le dossier `base de données` du dépôt Git.

### Lancement de l'application

- Ouvrez le terminal de Visual Studio Code.
- Naviguez vers le dossier du projet et lancez l'application avec :
  ```
  node app.js
  ```

## Bugs connus

- Mettre plusieurs fois les mêmes ingrédients dans l'ajout
