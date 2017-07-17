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

/*Table structure for table `t_cp_agent_order` */

DROP TABLE IF EXISTS `t_cp_agent_order`;

CREATE TABLE `t_cp_agent_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `agent_order_number` int(225) NOT NULL DEFAULT '0' COMMENT '订单号',
  `agent_name` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '客户姓名',
  `agent_order_detail` text COLLATE utf8_bin NOT NULL COMMENT '订单具体内容',
  `agent_order_note` text COLLATE utf8_bin NOT NULL COMMENT '订单备注',
  `agent_order_price` int(225) NOT NULL DEFAULT '0' COMMENT '订单价格',
  `agent_email` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '客户email',
  `agent_order_address` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '订单地址',
  `agent_order_batch` varchar(225) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '订单批号',
  `agent_order_status` int(1) DEFAULT '0' COMMENT '订单状态1未发货2.已发货3完结',
  `agent_order_send_date` time NOT NULL DEFAULT '00:00:00' COMMENT '订单发货时间',
  `agent_order_recev_date` time NOT NULL DEFAULT '00:00:00' COMMENT '订单收货时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `t_cp_agent_order` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
