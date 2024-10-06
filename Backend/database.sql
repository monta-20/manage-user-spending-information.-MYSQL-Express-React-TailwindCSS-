-- Database: `node_mysql_crud_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `spendings`
--

CREATE TABLE `spendings` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `count` INT NOT NULL,
  `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `type` TEXT NOT NULL,
  `model` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: Add a comment to the table for documentation purposes
-- COMMENT='Table to store spending records for users';

--mysql -u root -p
--USE spendings_db;
--SHOW TABLES;

