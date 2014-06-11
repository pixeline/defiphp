-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 11 Juin 2014 à 08:59
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `gordonlablog`
--

-- --------------------------------------------------------

--
-- Structure de la table `vl_admins`
--

CREATE TABLE IF NOT EXISTS `vl_admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `vl_admins`
--

INSERT INTO `vl_admins` (`id`, `username`, `password`) VALUES
(1, 'Silac', '55c457aa18eb35dcc5ccf8778d2bcd9aaef91448'),
(2, 'tfedwm14', '81e082583ba12b707015541bf3407753fd25812c');

-- --------------------------------------------------------

--
-- Structure de la table `vl_feedback`
--

CREATE TABLE IF NOT EXISTS `vl_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `design` int(11) NOT NULL,
  `usability` int(11) NOT NULL,
  `content` int(11) NOT NULL,
  `plugin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Structure de la table `vl_subs`
--

CREATE TABLE IF NOT EXISTS `vl_subs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
