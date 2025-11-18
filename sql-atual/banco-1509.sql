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
  `PFK_pousadaID` int(11) NOT NULL,
  `comodoNome` text NOT NULL,
  `comodoTipo` text NOT NULL,
  `descComodo` text DEFAULT NULL,
  `capacidadePessoas` int(11) NOT NULL,
  `comodoStatus` text DEFAULT NULL,
  `PK_comodoID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`PK_comodoID`),
  KEY `pousadaIDrestrict` (`PFK_pousadaID`),
  CONSTRAINT `pousadaIDrestrict` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `comodos` */

insert  into `comodos`(`PFK_pousadaID`,`comodoNome`,`comodoTipo`,`descComodo`,`capacidadePessoas`,`comodoStatus`,`PK_comodoID`) values 
(22,'Sala','Sala','Sala Principal',5,'Disponível',16),
(22,'Quarto Estrela','Suíte','Quarto Próximo a praia',2,'Ocupado',17),
(22,'Sauna','Área Molhada','Sauna ',5,'Em Manutenção',18),
(22,'Cozinha 1º Andar','Cozinha','Cozinha do primeiro andar',1,'Disponível',19),
(22,'Teste','Outros','Teste',9,'Em testes',24),
(26,'Teste','Área Molhada','Teste',3,'Disponível',25);

/*Table structure for table `contato` */

DROP TABLE IF EXISTS `contato`;

CREATE TABLE `contato` (
  `PFK_pousadaID` int(11) NOT NULL,
  `email` text NOT NULL,
  `telefone` int(11) DEFAULT NULL,
  `telefoneAlternativo` int(11) DEFAULT NULL,
  KEY `pousadaID` (`PFK_pousadaID`),
  CONSTRAINT `pousadaID` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contato` */

insert  into `contato`(`PFK_pousadaID`,`email`,`telefone`,`telefoneAlternativo`) values 
(22,'pousada@gmail.com',3,4),
(26,'teste@gmail.com',5,6);

/*Table structure for table `endereco` */

DROP TABLE IF EXISTS `endereco`;

CREATE TABLE `endereco` (
  `PFK_pousadaID` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numResidencia` varchar(15) NOT NULL,
  KEY `enderecoID` (`PFK_pousadaID`),
  CONSTRAINT `enderecoID` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `endereco` */

insert  into `endereco`(`PFK_pousadaID`,`rua`,`bairro`,`cidade`,`uf`,`numResidencia`) values 
(22,'Rua das Laranjeiras','Favela','Serra','ES','177'),
(26,'Rua 1 ','Seco','Seca','CE','1');

/*Table structure for table `objetos` */

DROP TABLE IF EXISTS `objetos`;

CREATE TABLE `objetos` (
  `PFK_comodoID` int(11) NOT NULL,
  `PK_objID` int(11) NOT NULL AUTO_INCREMENT,
  `objNome` varchar(100) NOT NULL,
  `objMarca` text NOT NULL,
  `objUnidades` int(11) NOT NULL,
  `objLink` text DEFAULT NULL,
  `objImagem` mediumblob DEFAULT NULL,
  PRIMARY KEY (`PK_objID`),
  KEY `PFK comodo` (`PFK_comodoID`),
  CONSTRAINT `PFK comodo` FOREIGN KEY (`PFK_comodoID`) REFERENCES `comodos` (`PK_comodoID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `objetos` */

insert  into `objetos`(`PFK_comodoID`,`PK_objID`,`objNome`,`objMarca`,`objUnidades`,`objLink`,`objImagem`) values 
(24,26,'teste','teste',1,'https://www.mercadolivre.com.br/','1763383261535-993218259.jpg'),
(24,27,'Lençol','Casa&Banho',1,'https://www.mercadolivre.com.br/','1763385245436-45217938.jpg');

/*Table structure for table `pousada` */

DROP TABLE IF EXISTS `pousada`;

CREATE TABLE `pousada` (
  `PK_pousadaID` int(11) NOT NULL AUTO_INCREMENT,
  `nomePousada` varchar(70) NOT NULL,
  `PFK_userID` int(11) NOT NULL,
  PRIMARY KEY (`PK_pousadaID`),
  KEY `PFK_userID` (`PFK_userID`) USING BTREE,
  CONSTRAINT `userID` FOREIGN KEY (`PFK_userID`) REFERENCES `user` (`PK_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pousada` */

insert  into `pousada`(`PK_pousadaID`,`nomePousada`,`PFK_userID`) values 
(22,'Pousada',36),
(26,'teste',36);

/*Table structure for table `telefone` */

DROP TABLE IF EXISTS `telefone`;

CREATE TABLE `telefone` (
  `PFK_pousadaID` int(11) NOT NULL,
  `PK_telefoneID` int(11) NOT NULL AUTO_INCREMENT,
  `numBandeira` varchar(10) NOT NULL,
  `numDistrital` varchar(10) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  PRIMARY KEY (`PK_telefoneID`),
  KEY `PFK pousada` (`PFK_pousadaID`),
  CONSTRAINT `PFK pousada` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `telefone` */

insert  into `telefone`(`PFK_pousadaID`,`PK_telefoneID`,`numBandeira`,`numDistrital`,`numero`) values 
(22,3,'+55','27','996107755'),
(22,4,'+55','27','996108866'),
(26,5,'+55','27','996128491'),
(26,6,'+55','27','888888888');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `PK_userID` int(11) NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `senha` text NOT NULL,
  `email` text NOT NULL,
  `codRecuperacaoUnico` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PK_userID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user` */

insert  into `user`(`PK_userID`,`nome`,`senha`,`email`,`codRecuperacaoUnico`) values 
(36,'teste','$2b$10$wVmdmGOyMXeClmSd9SLWf.wXNTo1MJTVWbbJt4qjg2EgHz/l2PJrW','teste@gmail.com',''),
(37,'teste','$2b$10$k5jHSJ4qUwdU5FOGGQlvfOo8bRtn0W6l.TlfwdDSqAcTW81d5OYB6','teste@teste.com',''),
(38,'Karllos','$2b$10$7Gw5S9UpVXzkP3KvSiZjxOUQBwCRpAJ81wsOh8ARSyzzTAXkNL.wC','karllos@gmail.com','');

/*Table structure for table `verificacoes` */

DROP TABLE IF EXISTS `verificacoes`;

CREATE TABLE `verificacoes` (
  `PK_verificacaoID` int(11) NOT NULL AUTO_INCREMENT,
  `PFK_comodoID` int(11) NOT NULL,
  `jsonObjComodo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`jsonObjComodo`)),
  `jsonObjPresentes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`jsonObjPresentes`)),
  `jsonObjFaltantes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`jsonObjFaltantes`)),
  `dataVerificacao` datetime NOT NULL,
  PRIMARY KEY (`PK_verificacaoID`),
  KEY `comodoPai` (`PFK_comodoID`),
  CONSTRAINT `comodoPai` FOREIGN KEY (`PFK_comodoID`) REFERENCES `comodos` (`PK_comodoID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `verificacoes` */

insert  into `verificacoes`(`PK_verificacaoID`,`PFK_comodoID`,`jsonObjComodo`,`jsonObjPresentes`,`jsonObjFaltantes`,`dataVerificacao`) values 
(9,24,'[{\"PK_objID\":26,\"objNome\":\"teste\",\"objMarca\":\"teste\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763383261535-993218259.jpg\"},{\"PK_objID\":27,\"objNome\":\"Lençol\",\"objMarca\":\"Casa&Banho\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763385245436-45217938.jpg\"}]','[{\"PK_objID\":26,\"objNome\":\"teste\",\"objMarca\":\"teste\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763383261535-993218259.jpg\",\"quantidade\":1}]','[{\"PK_objID\":27,\"objNome\":\"Lençol\",\"objMarca\":\"Casa&Banho\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763385245436-45217938.jpg\",\"quantidade\":0}]','2025-11-17 12:14:11'),
(10,24,'[{\"PK_objID\":26,\"objNome\":\"teste\",\"objMarca\":\"teste\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763383261535-993218259.jpg\"},{\"PK_objID\":27,\"objNome\":\"Lençol\",\"objMarca\":\"Casa&Banho\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763385245436-45217938.jpg\"}]','[{\"PK_objID\":26,\"objNome\":\"teste\",\"objMarca\":\"teste\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763383261535-993218259.jpg\",\"quantidade\":1},{\"PK_objID\":27,\"objNome\":\"Lençol\",\"objMarca\":\"Casa&Banho\",\"objUnidades\":1,\"objLink\":\"https://www.mercadolivre.com.br/\",\"objImagem\":\"1763385245436-45217938.jpg\",\"quantidade\":1}]','[]','2025-11-17 14:16:12');

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

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
