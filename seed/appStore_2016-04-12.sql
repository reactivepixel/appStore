# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.10)
# Database: appStore
# Generation Time: 2016-04-12 05:27:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table appAssets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `appAssets`;

CREATE TABLE `appAssets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('image','YouTube','other') DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `app_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_id` (`app_id`),
  CONSTRAINT `appassets_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `appAssets` WRITE;
/*!40000 ALTER TABLE `appAssets` DISABLE KEYS */;

INSERT INTO `appAssets` (`id`, `type`, `link`, `createdAt`, `updatedAt`, `deletedAt`, `app_id`)
VALUES
	(1,'image','http://lorempixel.com/600/600/','2016-04-12 05:04:51','2016-04-12 05:04:51',NULL,X'30373564333637342D653062342D343766322D393432382D643238666231643533363034'),
	(26,'image','http://lorempixel.com/600/600/','2016-04-12 05:23:22','2016-04-12 05:23:22',NULL,X'36393836393564302D303539392D346631322D393663622D656638353164326336363234'),
	(27,'image','http://lorempixel.com/600/600/','2016-04-12 05:23:25','2016-04-12 05:23:25',NULL,X'36393836393564302D303539392D346631322D393663622D656638353164326336363234'),
	(28,'image','http://lorempixel.com/600/600/','2016-04-12 05:23:26','2016-04-12 05:23:26',NULL,X'36393836393564302D303539392D346631322D393663622D656638353164326336363234'),
	(29,'image','http://lorempixel.com/600/600/','2016-04-12 05:23:26','2016-04-12 05:23:26',NULL,X'36393836393564302D303539392D346631322D393663622D656638353164326336363234');

/*!40000 ALTER TABLE `appAssets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table apps
# ------------------------------------------------------------

DROP TABLE IF EXISTS `apps`;

CREATE TABLE `apps` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `readme` text,
  `sourceLink` varchar(255) DEFAULT NULL,
  `exeLink` varchar(255) DEFAULT NULL,
  `iOSAppStoreLink` varchar(255) DEFAULT NULL,
  `releaseDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `apps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;

INSERT INTO `apps` (`id`, `title`, `description`, `readme`, `sourceLink`, `exeLink`, `iOSAppStoreLink`, `releaseDate`, `createdAt`, `updatedAt`, `deletedAt`, `user_id`)
VALUES
	(X'30373564333637342D653062342D343766322D393432382D643238666231643533363034','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:25','2016-04-11 22:39:25',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'32336565643638382D336434662D343163392D613333352D313562653237323433316363','Second best App','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:26','2016-04-11 23:28:59',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'32363663343630652D636165642D343331622D613164322D343062653466653663663361','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:26','2016-04-11 22:39:26',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'33333431663261612D633864642D343635632D623663382D613739336434343236646239','Best App Ever',NULL,NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:27:13','2016-04-11 22:27:13',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'36393836393564302D303539392D346631322D393663622D656638353164326336363234','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:25','2016-04-11 22:39:25',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'37343633303765332D353936312D346566662D616631302D633665613732623731623338','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:19','2016-04-11 22:39:19',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'38326532363964342D633963342D343365342D396464642D303734663964353036666563','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:25','2016-04-11 22:39:25',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239'),
	(X'61326337376237642D396264342D346330382D386333622D356366636565336630353464','Best App Ever','None really, it speaks for itself',NULL,NULL,NULL,NULL,NULL,'2016-04-11 22:39:25','2016-04-11 22:39:25',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239');

/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table histories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `histories`;

CREATE TABLE `histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rawRoute` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table listedApps
# ------------------------------------------------------------

DROP TABLE IF EXISTS `listedApps`;

CREATE TABLE `listedApps` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `appId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `listId` int(11) NOT NULL,
  PRIMARY KEY (`appId`,`listId`),
  KEY `listId` (`listId`),
  CONSTRAINT `listedapps_ibfk_1` FOREIGN KEY (`appId`) REFERENCES `apps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `listedapps_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table lists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lists`;

CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `releaseDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;

INSERT INTO `lists` (`id`, `title`, `releaseDate`, `createdAt`, `updatedAt`, `deletedAt`, `user_id`)
VALUES
	(1,'Staff Fav Picks',NULL,'2016-04-11 22:28:00','2016-04-11 22:28:00',NULL,X'33333431663261612D633864642D343635632D623663382D613739336434343236646239');

/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table socialAccounts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `socialAccounts`;

CREATE TABLE `socialAccounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialID` int(11) DEFAULT NULL,
  `publicLink` varchar(255) DEFAULT NULL,
  `type` enum('google','twitter','facebook') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `socialaccounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `dispName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `dispName`, `email`, `password`, `phone`, `createdAt`, `updatedAt`, `deletedAt`, `role_id`)
VALUES
	(X'33333431663261612D633864642D343635632D623663382D613739336434343236646239','Chapman','none@spam.com','$2a$10$2Go5vtza2oc2vodM.eYef.mD6OA4OpRptoku8dch3sE27MoQEplNC','407.900.9277','2016-04-11 22:26:20','2016-04-11 22:26:20',NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
