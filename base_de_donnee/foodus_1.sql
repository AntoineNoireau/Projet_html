-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 14 avr. 2024 à 22:33
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `foodus`
--

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id`, `nom`, `image`) VALUES
(1, 'oeuf', 'https://i.goopics.net/47sp73.png'),
(2, 'lait', 'https://i.goopics.net/1m3oen.png'),
(3, 'sucre', 'https://i.goopics.net/n9flsk.png'),
(4, 'farine', 'https://i.goopics.net/aneqwa.png'),
(5, 'sel', 'https://cdn-icons-png.flaticon.com/512/3130/3130156.png'),
(6, 'poivre', 'https://cdn-icons-png.flaticon.com/512/752/752942.png'),
(7, 'patate', 'https://i.goopics.net/sualte.png'),
(8, 'beurre', 'https://i.goopics.net/fsw9cs.png'),
(9, 'vanille', 'https://cdn-icons-png.flaticon.com/512/4788/4788089.png'),
(10, 'chocolat', 'https://cdn-icons-png.flaticon.com/512/6954/6954015.png'),
(11, 'levure', 'https://cdn-icons-png.flaticon.com/512/5900/5900642.png'),
(12, 'yaourt', 'https://cdn-icons-png.flaticon.com/512/76/76208.png'),
(13, 'huile', 'https://cdn-icons-png.flaticon.com/512/129/129276.png');

-- --------------------------------------------------------

--
-- Structure de la table `recettes`
--

CREATE TABLE `recettes` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recettes`
--

INSERT INTO `recettes` (`id`, `nom`, `image`, `url`) VALUES
(1, 'crepe', 'https://lustensile.fr/wp-content/uploads/2023/03/lustensile_pate_a_crepes.jpg', 'UGsvfsrP2fo'),
(2, 'puree', 'https://www.cookomix.com/wp-content/uploads/2016/03/puree-pommes-de-terre-thermomix-800x600.jpg', 'me11ivbr3uc'),
(27, 'mousse au chocolat', 'https://yummix.fr/wp-content/uploads/2023/09/mousse-au-chocolat-vegan.jpg', 'TC3h6kFR9S8'),
(28, 'pancake', 'https://assets.afcdn.com/recipe/20221013/136166_w314h314c1cx3072cy1728cxt0cyt0cxb6144cyb3456.webp', 'Vdf1UuIpCik'),
(29, 'gateau au yaourt', 'https://assets.afcdn.com/recipe/20130924/34684_w1024h1024c1cx2592cy1728.jpg', 'ZofY_rJ48zc');

-- --------------------------------------------------------

--
-- Structure de la table `recettesingredients`
--

CREATE TABLE `recettesingredients` (
  `id_recette` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `ordre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recettesingredients`
--

INSERT INTO `recettesingredients` (`id_recette`, `id_ingredient`, `ordre`) VALUES
(1, 1, 2),
(27, 1, 1),
(28, 1, 4),
(29, 1, 5),
(1, 2, 5),
(2, 2, 2),
(28, 2, 6),
(1, 3, 3),
(27, 3, 2),
(28, 3, 1),
(29, 3, 3),
(1, 4, 1),
(28, 4, 2),
(29, 4, 4),
(2, 5, 4),
(27, 5, 4),
(2, 6, 5),
(2, 7, 1),
(1, 8, 4),
(2, 8, 3),
(28, 8, 5),
(27, 9, 3),
(27, 10, 5),
(28, 11, 3),
(29, 12, 1),
(29, 13, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_unique` (`nom`);

--
-- Index pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_unique` (`nom`);

--
-- Index pour la table `recettesingredients`
--
ALTER TABLE `recettesingredients`
  ADD PRIMARY KEY (`id_ingredient`,`id_recette`),
  ADD KEY `id_recette` (`id_recette`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `recettes`
--
ALTER TABLE `recettes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `recettesingredients`
--
ALTER TABLE `recettesingredients`
  ADD CONSTRAINT `recettesingredients_ibfk_1` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id`),
  ADD CONSTRAINT `recettesingredients_ibfk_2` FOREIGN KEY (`id_recette`) REFERENCES `recettes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
