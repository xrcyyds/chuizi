-- MySQL dump 10.13  Distrib 5.7.26, for Win64 (x86_64)
--
-- Host: localhost    Database: chuizi
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `goods_id` int(255) NOT NULL,
  `goods_num` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (3,'16698515591',4,6),(2,'16698515591',2,5);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `img` text NOT NULL,
  `title1` varchar(255) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` text NOT NULL,
  `price2` text NOT NULL,
  `yellow` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (19,'2020年足迹系列卫衣《国家地理》杂志出版','https://resource.smartisan.com/resource/850325c63fe550ec292a07b507f8eb9f.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','黑色','￥249.00','',''),(20,'2020年足迹系列卫衣 Google 发布移动操作系统 Android','https://resource.smartisan.com/resource/861b880deb287298d171cfa9ccbb7985.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','浅灰','￥249.00','',''),(21,'2020年足迹系列卫衣 3M 开始在市场上销售透明胶带','https://resource.smartisan.com/resource/c4886f770ab610c0050dde5309e60e62.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','黑色','￥249.00','',''),(22,'2020年足迹系列卫衣 联合国通过《儿童权利宣言》','https://resource.smartisan.com/resource/e1539b71b9d8a9e5cb985c0c5b84ea04.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','黑色','￥249.00','',''),(23,'2020年足迹系列卫衣 安徒生出版第一部童话集','https://resource.smartisan.com/resource/7bab7274aabe6446544e3d3d9c4f5429.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','深灰','￥249.00','',''),(24,'2020年足迹系列卫衣 人类首次突破音速','https://resource.smartisan.com/resource/e8052d002a5808069b36b08718a6bb6c.png?x-oss-process=image/resize,w_270/format,webp','      精心剪裁、版型百搭、舒适服帖、易于打理    ','黑色','￥249.00','',''),(25,'地平线 8 号旅行箱','https://resource.smartisan.com/resource/db4895e45ee6f3339037dbf7200e63f2.png?x-oss-process=image/resize,w_270/format,webp','      简约设计、德国拜耳 PC 箱体     ','幻影黑','￥299.00','',''),(26,'地平线 8号 收纳袋四件套','https://resource.smartisan.com/resource/1986e561ea0724c68f31dd8f71063240.jpg?x-oss-process=image/resize,w_270/format,webp','          ','墨绿色','￥299.00','',''),(27,'地平线 8 号商务旅行箱','https://resource.smartisan.com/resource/190a2b0f96274c85973e1dd6ba3b511b.png?x-oss-process=image/resize,w_270/format,webp','      为了野心和远方    ','深枪灰','￥1,059.00','￥1,199.00','  直降'),(28,'地平线 8号 曲面屏细铝框旅行箱','https://resource.smartisan.com/resource/fd1971822497906a8eaed0ee3a27948a.jpg?x-oss-process=image/resize,w_270/format,webp','          ','幻夜黑','￥639.00','￥699.00','  直降'),(29,'地平线 8 号旅行箱 冰川粉','https://resource.smartisan.com/resource/32de3f32aea18639e29e3d1c9f821c96.jpeg?x-oss-process=image/resize,w_270/format,webp','      高级淡雅，颠覆你对粉色的固有想象    ','冰川粉','￥399.00','',''),(30,'地平线 8号 曲面屏PC旅行箱','https://resource.smartisan.com/resource/7d27cff1293b22ce0dbe448ca3e58c5a.jpg?x-oss-process=image/resize,w_270/format,webp','          ','橙色','￥499.00','',''),(31,'抖音文创 斜挎单肩帆布包','https://resource.smartisan.com/resource/7df76ec4859f6d5ab46084e7704fb53e.jpg?x-oss-process=image/resize,w_270/format,webp','      优质帆布面料，可拆卸肩带    ','白色','￥69.00','',''),(32,'抖音文创 笑脸渔夫帽','https://resource.smartisan.com/resource/dab835e6c357d658cfed4f6f17489539.jpg?x-oss-process=image/resize,w_270/format,webp','      经典渔夫款设计    ','黑色','￥89.00','',''),(33,'抖音文创 桑蚕丝真丝国风眼罩','https://resource.smartisan.com/resource/e34c6c431937a0e24f78b5c2b963e650.jpg?x-oss-process=image/resize,w_270/format,webp','      伴你进入深度睡眠    ','黑色','￥86.00','',''),(34,'抖音文创 工作要紧毛毯','https://resource.smartisan.com/resource/24acac0d91ea3a08f85943df60660ffe.jpg?x-oss-process=image/resize,w_270/format,webp','      松软亲肤，舒适温暖    ','黑色','￥88.00','',''),(35,'【2件起购】抖音文创 绕绳磨砂A4文件袋','https://resource.smartisan.com/resource/e4438c22af81158f0cc2fc0d769ab2ba.jpg?x-oss-process=image/resize,w_270/format,webp','      绳扣设计 磨砂处理    ','透明','￥9.90','',''),(36,'抖音文创 抖音小助手微粒积木','https://resource.smartisan.com/resource/ccbec7516176b5e5cef72dbbe42be640.jpg?x-oss-process=image/resize,w_270/format,webp','      益智拼装玩具    ','彩色','￥69.00','',''),(37,'坚果 R2 足迹系列保护套','https://resource.smartisan.com/resource/4974b2bb24ae8607c55a73944662f1f7.jpg?x-oss-process=image/resize,w_270/format,webp','      7种主题随机发货    ','七种主题随机发货','￥59.00','',''),(38,'坚果 R2 足迹系列保护套 Google 发布移动操作系统 Android','https://resource.smartisan.com/resource/1d3331e0b97a9e9bcb184c57055957cb.jpg?x-oss-process=image/resize,w_270/format,webp','      为了那些改变人类足迹的进程    ','Google 发布移动操作系统 Android','￥35.00','￥59.00','  直降'),(39,'坚果 R2 足迹系列保护套 联合国通过《儿童权利宣言》','https://resource.smartisan.com/resource/933ea337a2cd0069117b9cfcd4170ed0.jpg?x-oss-process=image/resize,w_270/format,webp','      为了那些改变人类足迹的进程    ','联合国通过《儿童权利宣言》','￥35.00','￥59.00','  直降'),(40,'坚果 R2 足迹系列保护套 圆珠笔的改进者出生','https://resource.smartisan.com/resource/992672ec0bd109c5915ca47ffd548fea.jpg?x-oss-process=image/resize,w_270/format,webp','      为了那些改变人类足迹的进程    ',' 圆珠笔的改进者出生','￥59.00','',''),(18,'坚果三脚架自拍杆','https://resource.smartisan.com/resource/f55641e23f35f6dd82226b6c4a043f00.jpg?x-oss-process=image/resize,w_270/format,webp','      两种模式，随时随地都能拍得开心    ','黑色','￥59.00','￥99.00','  直降'),(17,'Smartisan 55W 快速充电器（Type-C）','https://resource.smartisan.com/resource/2b5a226ddc22fe583282c8f75e2b5e57.jpg?x-oss-process=image/resize,w_270/format,webp','      最大输出功率 55W 支持 PD3.0 (PPS)、QC4+ 快充协议    ','白色','￥59.00','￥99.00','  直降'),(16,'坚果彩虹数据线','https://resource.smartisan.com/resource/82aab62886740f165a3631ce6cffe895.jpg?x-oss-process=image/resize,w_270/format,webp','      七彩配色随机发货，为生活增添一份小小惊喜    ','一条装','￥9.90','￥19.00','  直降'),(15,'Smartisan 半入耳式耳机','https://resource.smartisan.com/resource/30ac0a1ab02999667f1362c501447e58.jpg?x-oss-process=image/resize,w_270/format,webp','      经典配色、专业调音、高品质麦克风    ','白色','￥29.00','￥49.00','  直降'),(14,'Smartisan 手机支架','https://resource.smartisan.com/resource/8b0fe3117164dab7d91439b93dc112e0.png?x-oss-process=image/resize,w_270/format,webp','      立得住，放的稳    ','灰色','￥39.00','',''),(13,'Smartisan 真无线蓝牙耳机（抖音文创限量款）','https://resource.smartisan.com/resource/211d521553c8816ae1dc6fb5ecdcc99d.jpg?x-oss-process=image/resize,w_270/format,webp','      抖音文创限量版    ','黑色','￥259.00','￥299.00','  直降'),(12,'Smartisan 手机立式扩展坞','https://resource.smartisan.com/resource/49744cbd5e65047aeae623a6dde5610c.png?x-oss-process=image/resize,w_270/format,webp','      连屏幕，连外设，手机拓展一步到位    ','灰色','￥299.00','',''),(11,'Smartisan 智能手写笔','https://resource.smartisan.com/resource/c9a55fe8b5bc506fec60659aa2dcebe9.png?x-oss-process=image/resize,w_270/format,webp','      尽情挥洒创造力    ','灰色','￥299.00','￥499.00','  直降'),(10,'Smartisan TNT go','https://resource.smartisan.com/resource/2d68b229cc7cafbb1e74bc0f996fa57c.png?x-oss-process=image/resize,w_270/format,webp','      欢迎使用下一代电脑    ','无线版，含Smartisan 智能手写笔','￥2,999.00','',''),(9,'Smartisan TNT go','https://resource.smartisan.com/resource/4fc4edc5973be10c3d221c592e760063.png?x-oss-process=image/resize,w_270/format,webp','      欢迎使用下一代电脑    ','有线版','￥1,999.00','',''),(7,'Smartisan TNT 大满足套装','https://resource.smartisan.com/resource/79c58355d2f5fd53988684b96d405f9b.png?x-oss-process=image/resize,w_270/format,webp','      下一代手机，下一代电脑    ','坚果 R2（8+128） + TNT go（有线版套装，含笔、扩展坞）','￥6,499.00','',''),(8,'Smartisan TNT 大满足套装','https://resource.smartisan.com/resource/f0fc0041b540c755ad43a4dc25ccdbae.png?x-oss-process=image/resize,w_270/format,webp','      下一代手机，下一代电脑    ','坚果 R2（12+256） + TNT go（无线版套装，含笔、扩展坞）','￥7,699.00','',''),(6,'坚果 R2 足迹系列保护套 圆珠笔的改进者出生','https://resource.smartisan.com/resource/992672ec0bd109c5915ca47ffd548fea.jpg?x-oss-process=image/resize,w_270/format,webp','      为了那些改变人类足迹的进程    ','圆珠笔的改进者出生','￥59.00','',''),(5,'坚果 R2 足迹系列保护套 3M 开始销售透明胶带','https://resource.smartisan.com/resource/4a95e648a4ec570aebad08e501cbffba.jpg?x-oss-process=image/resize,w_270/format,webp','      为了那些改变人类足迹的进程    ','3M 开始销售透明胶带','￥35.00','￥59.00','  直降'),(3,'坚果 R2','https://resource.smartisan.com/resource/a565ebb3399e2776c97dcb8b906f1b86.png?x-oss-process=image/resize,w_270/format,webp','      是下一代手机，更是下一代电脑    ','纯白光阴特别版','￥6,499.00','',''),(4,'坚果 R2 足迹系列保护套','https://resource.smartisan.com/resource/4974b2bb24ae8607c55a73944662f1f7.jpg?x-oss-process=image/resize,w_270/format,webp','      7种主题随机发货    ','7种主题随机发货    ','￥59.00','',''),(1,'坚果 R2','https://resource.smartisan.com/resource/4d9e7683b590cf4a6996d3b13136bcf8.png?x-oss-process=image/resize,w_270/format,webp','      是下一代手机，更是下一代电脑    ','浅黑色','￥3,999.00','',''),(2,'坚果 R2','https://resource.smartisan.com/resource/623bad86546352a2035ec704e2faf041.png?x-oss-process=image/resize,w_270/format,webp','      是下一代手机，更是下一代电脑    ','松绿色','￥4,299.00','',''),(41,'足迹保护套 莱卡成为第一只进入地球轨道的动物 for iPhone 11','https://resource.smartisan.com/resource/5888f9b53cd1184ac32f2ae778cd7804.jpg?x-oss-process=image/resize,w_270/format,webp','      公益宝贝    ','莱卡成为第一只进入地球轨道的动物 for iPhone 11','￥39.00','￥69.00','  直降'),(42,'坚果 Pro 3 足迹保护套 莫里斯·詹姆士·麦当劳出生','https://resource.smartisan.com/resource/31c8be42fbbabad10490835d953be356.jpg?x-oss-process=image/resize,w_270/format,webp','      这一次，两面都有好故事    ','莫里斯·詹姆士·麦当劳出生','￥49.00','','');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlist`
--

DROP TABLE IF EXISTS `userlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `password` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlist`
--

LOCK TABLES `userlist` WRITE;
/*!40000 ALTER TABLE `userlist` DISABLE KEYS */;
INSERT INTO `userlist` VALUES (1,'16698515591',5591),(2,'16698515577',5577);
/*!40000 ALTER TABLE `userlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-28 15:47:40
