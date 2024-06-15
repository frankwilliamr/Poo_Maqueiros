-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: Maqueiros
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB-1:11.3.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Incidente`
--

DROP TABLE IF EXISTS `Incidente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incidente` (
  `ID_incidente` int(11) NOT NULL AUTO_INCREMENT,
  `Data_Incidente` varchar(30) NOT NULL,
  `Hora_Incidente`  varchar(30) NOT NULL,
  `Descricao_Incidente` varchar(500) NOT NULL,
  `ID_transporte` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_incidente`),
  KEY `ID_transporte` (`ID_transporte`),
  CONSTRAINT `Incidente_ibfk_1` FOREIGN KEY (`ID_transporte`) REFERENCES `Transporte` (`ID_solicitacao`)
  ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Incidente`
--

LOCK TABLES `Incidente` WRITE;
/*!40000 ALTER TABLE `Incidente` DISABLE KEYS */;
INSERT INTO `Incidente` VALUES (1,'2024-05-30', '14:30:00','Queda no banheiro',1),(2,'2024-05-31', '09:15:00','Dificuldade respiratória',2);
/*!40000 ALTER TABLE `Incidente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Maqueiro`
--

DROP TABLE IF EXISTS `Maqueiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Maqueiro` (
  `ID_maqueiro` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Senha` varchar(20) NOT NULL,
  `Cargo` varchar(30) NOT NULL,
  PRIMARY KEY (`ID_maqueiro`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Maqueiro`
--

LOCK TABLES `Maqueiro` WRITE;
/*!40000 ALTER TABLE `Maqueiro` DISABLE KEYS */;
INSERT INTO `Maqueiro` VALUES (1,'João Silva','joao.silva@example.com','senha123','Enfermeiro'),(2,'Maria Oliveira','maria.oliveira@example.com','senha456','Auxiliar de Enfermagem');
/*!40000 ALTER TABLE `Maqueiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Paciente`
--

DROP TABLE IF EXISTS `Paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Paciente` (
  `ID_paciente` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) NOT NULL,
  `Idade` varchar(50) NOT NULL,
  `Numero_Prontuario` int(10) NOT NULL,
  `Localização_Atual` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Paciente`
--

LOCK TABLES `Paciente` WRITE;
/*!40000 ALTER TABLE `Paciente` DISABLE KEYS */;
INSERT INTO `Paciente` VALUES (1,'Carlos Souza','45',12345,'Quarto 101'),(2,'Ana Lima','32',67890,'UTI 3'),(3,'nome','2024-05-03',324,'Leito 2'),(7,'wqdqwd','2024-04-04',12321,'Leito 6'),(8,'frank','2024-04-03',12324,'Leito 4');
/*!40000 ALTER TABLE `Paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transporte`
--

DROP TABLE IF EXISTS `Transporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transporte` (
  `ID_solicitacao` int(11) NOT NULL AUTO_INCREMENT,
  `Local_Origem` varchar(30) NOT NULL,
  `Local_Destino` varchar(30) NOT NULL,
  `Prioridade` varchar(30) NOT NULL,
  `Status_solicitacao` varchar(30) DEFAULT NULL,
  `Status_Transporte` varchar(30) DEFAULT NULL,
  `ID_paciente` int(11) DEFAULT NULL,
  `Observacoes` varchar(300) NOT NULL,
  `ID_maqueiro` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_solicitacao`),
  KEY `ID_maqueiro` (`ID_maqueiro`),
  KEY `ID_paciente` (`ID_paciente`),
  CONSTRAINT `Transporte_ibfk_1` FOREIGN KEY (`ID_paciente`) REFERENCES `Paciente` (`ID_paciente`),
  CONSTRAINT `Transporte_ibfk_2` FOREIGN KEY (`ID_maqueiro`) REFERENCES `Maqueiro` (`ID_maqueiro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transporte`
--

LOCK TABLES `Transporte` WRITE;
/*!40000 ALTER TABLE `Transporte` DISABLE KEYS */;
INSERT INTO `Transporte` VALUES (1,'Quarto 101','Radiologia','Sim','Pendente','A Caminho', 1, 'Obs', 1),(2,'UTI 3','Sala de Cirurgia','Nao','Concluído','Finalizado', 2, 'Obs', 2);
/*!40000 ALTER TABLE `Transporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Maqueiros'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-10 20:03:52
