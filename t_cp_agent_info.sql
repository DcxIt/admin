/*
SQLyog Ultimate v11.26 (32 bit)
MySQL - 5.6.17 : Database - test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`test` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `test`;

/*Table structure for table `t_cp_agent_info` */

DROP TABLE IF EXISTS `t_cp_agent_info`;

CREATE TABLE `t_cp_agent_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `agent_name` varchar(225) COLLATE utf8_bin NOT NULL COMMENT '客户姓名',
  `agent_sex` int(2) NOT NULL DEFAULT '1' COMMENT '客户性别1男0女',
  `agent_age` int(100) NOT NULL DEFAULT '0' COMMENT '客户年龄',
  `agent_phone` int(11) NOT NULL DEFAULT '0' COMMENT '客户电话',
  `agent_email` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '客户邮箱',
  `agent_address` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '客户地址',
  `agent_country` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '客户国家',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `t_cp_agent_info` */

insert  into `t_cp_agent_info`(`id`,`agent_name`,`agent_sex`,`agent_age`,`agent_phone`,`agent_email`,`agent_address`,`agent_country`) values (1,'cx',1,20,2147483647,'458593490@qq.com','dasdasdas',''),(2,'cd',1,0,0,'0','0','0'),(3,'cv',1,0,0,'0','0','0'),(4,'cdd',1,0,0,'0','0','0'),(5,'cdg',1,0,0,'0','0','0'),(6,'gdfgdf',1,0,0,'0','0','0'),(7,'dfgdfgnfg',1,0,0,'0','0','0'),(8,'nhgngh',1,0,0,'0','0','0'),(9,'nghngh',1,0,0,'0','0','0'),(10,'ghnghn',1,0,0,'0','0','0'),(11,'nghngn',1,0,0,'0','0','0'),(12,'nghnghn',1,0,0,'0','0','0'),(13,'ghnghng',1,0,0,'0','0','0'),(14,'ghnghngh',1,0,0,'0','0','0'),(15,'ghnghnghn',1,0,0,'0','0','0'),(16,'ghngn',1,0,0,'0','0','0');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
