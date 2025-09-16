/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - pousada
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pousada` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `pousada`;

/*Table structure for table `comodos` */

DROP TABLE IF EXISTS `comodos`;

CREATE TABLE `comodos` (
  `pousadaID` int(11) NOT NULL,
  `comodoNome` text NOT NULL,
  `comodoTipo` text NOT NULL,
  `descComodo` text DEFAULT NULL,
  `capacidade` int(11) NOT NULL,
  `comodoStatus` text DEFAULT NULL,
  `comodoId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`comodoId`),
  KEY `pousadaIDrestrict` (`pousadaID`),
  CONSTRAINT `pousadaIDrestrict` FOREIGN KEY (`pousadaID`) REFERENCES `pousada` (`pousadaID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `comodos` */

/*Table structure for table `contato` */

DROP TABLE IF EXISTS `contato`;

CREATE TABLE `contato` (
  `pousadaID` int(11) NOT NULL,
  `email` int(11) NOT NULL,
  `telefone` int(11) NOT NULL,
  `telefoneAlternativo` int(11) NOT NULL,
  KEY `pousadaID` (`pousadaID`),
  CONSTRAINT `pousadaID` FOREIGN KEY (`pousadaID`) REFERENCES `pousada` (`pousadaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contato` */

/*Table structure for table `endereco` */

DROP TABLE IF EXISTS `endereco`;

CREATE TABLE `endereco` (
  `enderecoID` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  KEY `enderecoID` (`enderecoID`),
  CONSTRAINT `enderecoID` FOREIGN KEY (`enderecoID`) REFERENCES `pousada` (`pousadaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `endereco` */

/*Table structure for table `loggeral` */

DROP TABLE IF EXISTS `loggeral`;

CREATE TABLE `loggeral` (
  `logId` int(11) NOT NULL AUTO_INCREMENT,
  `tabelaAfetada` varchar(50) NOT NULL,
  `acao` varchar(10) NOT NULL,
  `idRegistro` varchar(100) NOT NULL,
  `dadosAntigos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dadosAntigos`)),
  `dadosNovos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dadosNovos`)),
  `usuarioId` int(11) DEFAULT NULL,
  `dataHora` timestamp NOT NULL DEFAULT current_timestamp(),
  `ipUsuario` varchar(45) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `loggeral` */

insert  into `loggeral`(`logId`,`tabelaAfetada`,`acao`,`idRegistro`,`dadosAntigos`,`dadosNovos`,`usuarioId`,`dataHora`,`ipUsuario`,`descricao`) values 
(3,'user','INSERT','idUser:1',NULL,'{\"idUser\": 1, \"nome\": \"vasco\", \"email\": \"vasco@gmail.com\"}',NULL,'2025-09-15 15:57:28',NULL,'Novo usuário criado: vasco'),
(4,'user','INSERT','idUser:2',NULL,'{\"idUser\": 2, \"nome\": \"Mc Manerin\", \"email\": \"mcmaneirinho@gmail.com\"}',NULL,'2025-09-15 21:50:05',NULL,'Novo usuário criado: Mc Manerin'),
(5,'user','UPDATE','idUser:1','{\"idUser\": 1, \"nome\": \"vasco\", \"email\": \"vasco@gmail.com\"}','{\"idUser\": 1, \"nome\": \"vasco\", \"email\": \"vasco@gmail.com\"}',NULL,'2025-09-15 22:07:46',NULL,'Usuário atualizado: vasco'),
(6,'user','UPDATE','idUser:1','{\"idUser\": 1, \"nome\": \"vasco\", \"email\": \"vasco@gmail.com\"}','{\"idUser\": 1, \"nome\": \"vasco\", \"email\": \"vasco@gmail.com\"}',NULL,'2025-09-15 22:07:54',NULL,'Usuário atualizado: vasco');

/*Table structure for table `objetos` */

DROP TABLE IF EXISTS `objetos`;

CREATE TABLE `objetos` (
  `comodoId` int(11) NOT NULL,
  `objId` int(11) NOT NULL AUTO_INCREMENT,
  `objNome` int(11) NOT NULL,
  `objMarca` text NOT NULL,
  `objUnidades` int(11) NOT NULL,
  `objLink` text DEFAULT NULL,
  `objImagem` blob DEFAULT NULL,
  PRIMARY KEY (`objId`),
  KEY `PFK comodo` (`comodoId`),
  CONSTRAINT `PFK comodo` FOREIGN KEY (`comodoId`) REFERENCES `comodos` (`comodoId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `objetos` */

/*Table structure for table `pousada` */

DROP TABLE IF EXISTS `pousada`;

CREATE TABLE `pousada` (
  `pousadaID` int(11) NOT NULL AUTO_INCREMENT,
  `nomePousada` varchar(70) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`pousadaID`),
  KEY `userID` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pousada` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `senha` text NOT NULL,
  `email` text NOT NULL,
  `adm` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user` */

insert  into `user`(`idUser`,`nome`,`senha`,`email`,`adm`) values 
(1,'vasco','adm123','vasco@gmail.com',1),
(2,'Mc Manerin','vascao','mcmaneirinho@gmail.com',NULL);

/* Trigger structure for table `comodos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_comodos_after_insert` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_comodos_after_insert` AFTER INSERT ON `comodos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Comodos',
        'INSERT',
        CONCAT('comodoId:', NEW.comodoId),
        JSON_OBJECT(
            'comodoId', NEW.comodoId,
            'comodoNome', NEW.comodoNome,
            'comodoTipo', NEW.comodoTipo,
            'descComodo', NEW.descComodo,
            'capacidade', NEW.capacidade,
            'comodoStatus', NEW.comodoStatus
        ),
        @current_user_id,
        CONCAT('Novo cômodo criado: ', NEW.comodoNome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `comodos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_comodos_after_update` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_comodos_after_update` AFTER UPDATE ON `comodos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Comodos',
        'UPDATE',
        NEW.comodoId,
        JSON_OBJECT(
            'comodoId', OLD.comodoId,
            'comodoNome', OLD.comodoNome,
            'comodoTipo', OLD.comodoTipo,
            'descComodo', OLD.descComodo,
            'capacidade', OLD.capacidade,
            'comodoStatus', OLD.comodoStatus
        ),
        JSON_OBJECT(
            'comodoId', NEW.comodoId,
            'comodoNome', NEW.comodoNome,
            'comodoTipo', NEW.comodoTipo,
            'descComodo', NEW.descComodo,
            'capacidade', NEW.capacidade,
            'comodoStatus', NEW.comodoStatus
        ),
        @current_user_id,
        CONCAT('Cômodo atualizado: ', NEW.comodoNome, ' (ID: ', NEW.comodoId, ')')
    );
END */$$


DELIMITER ;

/* Trigger structure for table `comodos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_comodos_after_delete` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_comodos_after_delete` AFTER DELETE ON `comodos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Comodos',
        'DELETE',
        OLD.comodoId,
        JSON_OBJECT(
            'comodoId', OLD.comodoId,
            'comodoNome', OLD.comodoNome,
            'comodoTipo', OLD.comodoTipo,
            'descComodo', OLD.descComodo,
            'capacidade', OLD.capacidade,
            'comodoStatus', OLD.comodoStatus
        ),
        @current_user_id,
        CONCAT('Cômodo excluído: ', OLD.comodoNome, ' (ID: ', OLD.comodoId, ')')
    );
END */$$


DELIMITER ;

/* Trigger structure for table `objetos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_objetos_after_insert` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_objetos_after_insert` AFTER INSERT ON `objetos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Objetos',
        'INSERT',
        CONCAT('comodoId:', NEW.comodoId, ', objId:', NEW.objId),
        JSON_OBJECT(
            'comodoId', NEW.comodoId,
            'objId', NEW.objId,
            'objNome', NEW.objNome,
            'objMarca', NEW.objMarca,
            'objUnidades', NEW.objUnidades,
            'objLink', NEW.objLink,
            'objImagem', NEW.objImagem
        ),
        @current_user_id, -- Você precisa definir esta variável na sua aplicação
        CONCAT('Novo objeto inserido: ', NEW.objNome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `objetos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_objetos_after_update` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_objetos_after_update` AFTER UPDATE ON `objetos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Objetos',
        'UPDATE',
        CONCAT('comodoId:', NEW.comodoId, ', objId:', NEW.objId),
        JSON_OBJECT(
            'comodoId', OLD.comodoId,
            'objId', OLD.objId,
            'objNome', OLD.objNome,
            'objMarca', OLD.objMarca,
            'objUnidades', OLD.objUnidades,
            'objLink', OLD.objLink,
            'objImagem', OLD.objImagem
        ),
        JSON_OBJECT(
            'comodoId', NEW.comodoId,
            'objId', NEW.objId,
            'objNome', NEW.objNome,
            'objMarca', NEW.objMarca,
            'objUnidades', NEW.objUnidades,
            'objLink', NEW.objLink,
            'objImagem', NEW.objImagem
        ),
        @current_user_id,
        CONCAT('Objeto atualizado: ', NEW.objNome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `objetos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_objetos_after_delete` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_objetos_after_delete` AFTER DELETE ON `objetos` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        usuarioId,
        descricao
    )
    VALUES (
        'Objetos',
        'DELETE',
        CONCAT('comodoId:', OLD.comodoId, ', objId:', OLD.objId),
        JSON_OBJECT(
            'comodoId', OLD.comodoId,
            'objId', OLD.objId,
            'objNome', OLD.objNome,
            'objMarca', OLD.objMarca,
            'objUnidades', OLD.objUnidades,
            'objLink', OLD.objLink,
            'objImagem', OLD.objImagem
        ),
        @current_user_id,
        CONCAT('Objeto removido: ', OLD.objNome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `user` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_user_after_insert` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_user_after_insert` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'user',
        'INSERT',
        CONCAT('idUser:', NEW.idUser),
        JSON_OBJECT(
            'idUser', NEW.idUser,
            'nome', NEW.nome,
            'email', NEW.email
            -- Não logamos a senha por segurança
        ),
        @current_user_id,
        CONCAT('Novo usuário criado: ', NEW.nome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `user` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_user_after_update` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_user_after_update` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        dadosNovos, 
        usuarioId,
        descricao
    )
    VALUES (
        'user',
        'UPDATE',
        CONCAT('idUser:', NEW.idUser),
        JSON_OBJECT(
            'idUser', OLD.idUser,
            'nome', OLD.nome,
            'email', OLD.email
        ),
        JSON_OBJECT(
            'idUser', NEW.idUser,
            'nome', NEW.nome,
            'email', NEW.email
        ),
        @current_user_id,
        CONCAT('Usuário atualizado: ', NEW.nome)
    );
END */$$


DELIMITER ;

/* Trigger structure for table `user` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trg_user_after_delete` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trg_user_after_delete` AFTER DELETE ON `user` FOR EACH ROW BEGIN
    INSERT INTO LogGeral (
        tabelaAfetada, 
        acao, 
        idRegistro, 
        dadosAntigos, 
        usuarioId,
        descricao
    )
    VALUES (
        'user',
        'DELETE',
        CONCAT('idUser:', OLD.idUser),
        JSON_OBJECT(
            'idUser', OLD.idUser,
            'nome', OLD.nome,
            'email', OLD.email
        ),
        @current_user_id,
        CONCAT('Usuário removido: ', OLD.nome)
    );
END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
