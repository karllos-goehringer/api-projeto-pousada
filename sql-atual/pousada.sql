-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/10/2025 às 23:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pousada`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `comodos`
--

CREATE TABLE `comodos` (
  `PFK_pousadaID` int(11) NOT NULL,
  `comodoNome` text NOT NULL,
  `comodoTipo` text NOT NULL,
  `descComodo` text DEFAULT NULL,
  `capacidadePessoas` int(11) NOT NULL,
  `comodoStatus` text DEFAULT NULL,
  `PK_comodoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `contato`
--

CREATE TABLE `contato` (
  `PFK_pousadaID` int(11) NOT NULL,
  `email` text NOT NULL,
  `telefone` int(11) DEFAULT NULL,
  `telefoneAlternativo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contato`
--

INSERT INTO `contato` (`PFK_pousadaID`, `email`, `telefone`, `telefoneAlternativo`) VALUES
(22, 'pousada@gmail.com', 3, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `PFK_pousadaID` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numResidencia` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`PFK_pousadaID`, `rua`, `bairro`, `cidade`, `uf`, `numResidencia`) VALUES
(22, 'Rua das Laranjeiras', 'Laranjeiras', 'Serra', 'ES', '177');

-- --------------------------------------------------------

--
-- Estrutura para tabela `objetos`
--

CREATE TABLE `objetos` (
  `PFK_comodoID` int(11) NOT NULL,
  `PK_objID` int(11) NOT NULL,
  `objNome` int(11) NOT NULL,
  `objMarca` text NOT NULL,
  `objUnidades` int(11) NOT NULL,
  `objLink` text DEFAULT NULL,
  `objImagem` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pousada`
--

CREATE TABLE `pousada` (
  `PK_pousadaID` int(11) NOT NULL,
  `nomePousada` varchar(70) NOT NULL,
  `PFK_userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pousada`
--

INSERT INTO `pousada` (`PK_pousadaID`, `nomePousada`, `PFK_userID`) VALUES
(22, 'Pousada', 36);

-- --------------------------------------------------------

--
-- Estrutura para tabela `telefone`
--

CREATE TABLE `telefone` (
  `PFK_pousadaID` int(11) NOT NULL,
  `PK_telefoneID` int(11) NOT NULL,
  `numBandeira` varchar(10) NOT NULL,
  `numDistrital` varchar(10) DEFAULT NULL,
  `numero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `telefone`
--

INSERT INTO `telefone` (`PFK_pousadaID`, `PK_telefoneID`, `numBandeira`, `numDistrital`, `numero`) VALUES
(22, 3, '+55', '27', '996107755'),
(22, 4, '+55', '27', '996108866');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `PK_userID` int(11) NOT NULL,
  `nome` text NOT NULL,
  `senha` text NOT NULL,
  `email` text NOT NULL,
  `codRecuperacaoUnico` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`PK_userID`, `nome`, `senha`, `email`, `codRecuperacaoUnico`) VALUES
(36, 'teste', '$2b$10$wVmdmGOyMXeClmSd9SLWf.wXNTo1MJTVWbbJt4qjg2EgHz/l2PJrW', 'teste@gmail.com', '');

--
-- Acionadores `user`
--
DELIMITER $$
CREATE TRIGGER `trg_user_after_update` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
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
END
$$
DELIMITER ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `comodos`
--
ALTER TABLE `comodos`
  ADD PRIMARY KEY (`PK_comodoID`),
  ADD KEY `pousadaIDrestrict` (`PFK_pousadaID`);

--
-- Índices de tabela `contato`
--
ALTER TABLE `contato`
  ADD KEY `pousadaID` (`PFK_pousadaID`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD KEY `enderecoID` (`PFK_pousadaID`);

--
-- Índices de tabela `objetos`
--
ALTER TABLE `objetos`
  ADD PRIMARY KEY (`PK_objID`),
  ADD KEY `PFK comodo` (`PFK_comodoID`);

--
-- Índices de tabela `pousada`
--
ALTER TABLE `pousada`
  ADD PRIMARY KEY (`PK_pousadaID`),
  ADD KEY `PFK_userID` (`PFK_userID`) USING BTREE;

--
-- Índices de tabela `telefone`
--
ALTER TABLE `telefone`
  ADD PRIMARY KEY (`PK_telefoneID`),
  ADD KEY `PFK pousada` (`PFK_pousadaID`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`PK_userID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comodos`
--
ALTER TABLE `comodos`
  MODIFY `PK_comodoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `objetos`
--
ALTER TABLE `objetos`
  MODIFY `PK_objID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `pousada`
--
ALTER TABLE `pousada`
  MODIFY `PK_pousadaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `telefone`
--
ALTER TABLE `telefone`
  MODIFY `PK_telefoneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `PK_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comodos`
--
ALTER TABLE `comodos`
  ADD CONSTRAINT `pousadaIDrestrict` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`);

--
-- Restrições para tabelas `contato`
--
ALTER TABLE `contato`
  ADD CONSTRAINT `pousadaID` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `enderecoID` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`);

--
-- Restrições para tabelas `objetos`
--
ALTER TABLE `objetos`
  ADD CONSTRAINT `PFK comodo` FOREIGN KEY (`PFK_comodoID`) REFERENCES `comodos` (`PK_comodoID`);

--
-- Restrições para tabelas `pousada`
--
ALTER TABLE `pousada`
  ADD CONSTRAINT `userID` FOREIGN KEY (`PFK_userID`) REFERENCES `user` (`PK_userID`);

--
-- Restrições para tabelas `telefone`
--
ALTER TABLE `telefone`
  ADD CONSTRAINT `PFK pousada` FOREIGN KEY (`PFK_pousadaID`) REFERENCES `pousada` (`PK_pousadaID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
