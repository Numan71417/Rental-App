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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) PRIMARY KEY,
  `merchant` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(125) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `photo` text ,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `user`:
--

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `merchant`, `name`, `email`, `password`, `mobile`, `photo`) VALUES
(1, 0, 'numan', 'numan@raza.com', '123456', '0', ' '),
(2, 1, 'Luffy', 'luffy@onepiece.com', 'meat', '9876543210', ''),
(3, 0, 'ussop', 'ussop@op.com', 'nose', '9087624321', ''),
(5, 0, 'tony tony copper', 'chopper@op.com', 'candy', '9876543510', ''),
(25, 1, 'numan', 'numan@gmail.com', '$2b$10$0iHWZALDd5GxQqF8Hvyc..4N2/GAGmnB3J7lmUMPH/5o2sfOC2W8W', '09964974885', 'https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg'),
(26, 1, 'Kakashi', 'kakashi@gmail.com', '$2b$10$fXQRLu07rGoTEBlnSkO1LuB2Myz1qEgshxckanPwD8/00p6IucTnW', '9876543210', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/kkkkk.jpg?alt=media&token=18997696-cfb0-4a3a-9b28-3900bc21b85e'),
(27, 1, 'anfal', 'anfal@gmail.com', '$2b$10$PhFCl0GwKauFpcP.yOzBauZZyPxf4fBpLecAM0xXpz1UVNBlK0WKi', '9876543210', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/avatar.jpg?alt=media&token=1673c35d-e28a-4996-bbfa-3bce1084030e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
