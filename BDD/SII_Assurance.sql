-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Mar 14 Février 2017 à 09:54
-- Version du serveur :  5.6.28
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `SII_Assurance`
--

-- --------------------------------------------------------

DROP DATABASE IF EXISTS `SII_Assurance`;
CREATE DATABASE IF NOT EXISTS `SII_Assurance`;
USE `SII_Assurance`;
--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `Id` int(4) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `Mdp` varchar(255) NOT NULL,
  `Id_Eth` varchar(255) NOT NULL,
  `Role` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Users`
--

INSERT INTO `Users` (`Id`, `Nom`, `Prenom`, `Mail`, `Mdp`, `Id_Eth`, `Role`) VALUES
(1, 'Admin', 'Admin', 'nicolas.poirier.sio@gmail.com', 'azerty', '0xed84a3cAA9e60de6bF0B17bAEA1d892aEbBA8f43', 0),
(2, 'Huron', 'Kevin', 'huron_k@etna-alternance.net', 'azerty', '0x9BfB39eFD833DfcFE2b0D66D6cEE05a69507db4c', 1),
(3, 'Aurelien', 'Perrier', 'perrie_a@etna-alternance.net', 'azerty', '0x9BfB39eFD833DfcFE2b0D66D6cEE05a69507db4c', 1),
(4, 'Loquet', 'Jonathan', 'loquet_j@etna-alternance.net', 'azerty', '0x9BfB39eFD833DfcFE2b0D66D6cEE05a69507db4c', 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;