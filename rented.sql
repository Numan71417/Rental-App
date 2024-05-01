-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2024 at 07:08 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentalapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `rented`
--

CREATE TABLE `rented` (
  `id` int(11) NOT NULL,
  `seller` int(80) NOT NULL,
  `renter` int(80) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `expire` datetime DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `rented`:
--   `renter`
--       `user` -> `id`
--   `seller`
--       `user` -> `id`
--   `item_id`
--       `items` -> `id`
--

--
-- Dumping data for table `rented`
--

INSERT INTO `rented` (`id`, `seller`, `renter`, `time`, `expire`, `item_id`) VALUES
(4, 1, 5, '2024-04-24 12:07:12', '2024-04-29 20:58:59', 1),
(5, 3, 26, '2024-04-30 13:42:19', '2024-04-30 19:12:19', 1),
(10, 25, 26, '2024-04-30 13:03:03', '2024-05-08 18:32:00', 16),
(11, 2, 27, '2024-05-01 05:32:48', '2024-05-03 11:02:00', 6),
(12, 2, 27, '2024-05-01 05:54:58', '2024-05-03 11:24:00', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rented`
--
ALTER TABLE `rented`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_fk` (`item_id`),
  ADD KEY `fk_2` (`renter`),
  ADD KEY `foreign_key` (`seller`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rented`
--
ALTER TABLE `rented`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rented`
--
ALTER TABLE `rented`
  ADD CONSTRAINT `fk_2` FOREIGN KEY (`renter`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `foreign_key` FOREIGN KEY (`seller`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `item_fk` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
