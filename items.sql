-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2024 at 07:07 AM
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
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_name` varchar(125) NOT NULL,
  `category` varchar(125) NOT NULL,
  `price` bigint(15) NOT NULL,
  `description` text NOT NULL,
  `photo` text NOT NULL,
  `pic1` text DEFAULT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_name`, `category`, `price`, `description`, `photo`, `pic1`, `owner`) VALUES
(1, 'HC Verma', 'Books', 800, 'This book is for Physics and its name is The concepts of physics which is written by H.C Verma and Physics Wallah also admire his so much', 'https://rukminim2.flixcart.com/image/850/1000/krgohow0/regionalbooks/1/e/5/concepts-of-physics-original-imag59ahype46fy9.jpeg?q=90&crop=false', '', 3),
(6, 'Hardware tools', 'hardware', 200, 'It is set of tools used for mechanic purposes', 'https://5.imimg.com/data5/SELLER/Default/2022/12/JV/PP/MR/91800516/hardware-item-500x500-1-jpg-500x500.jpg', 'https://m.media-amazon.com/images/I/514iR8890tL._AC_UF1000,1000_QL80_.jpg', 2),
(16, 'DSLR camera', 'Gadgets', 500, 'Even though the DSLR (or “digital single-lens reflex”) is a term that\'s become synonymous with digital cameras and interchangeable lenses, DSLRs are just one type of digital camera.', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/figma-crash-course.jpg?alt=media&token=1b542db2-dc09-4891-9867-02042fe424f5', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/win.JPG?alt=media&token=9e29cea6-60fe-4134-8a78-191cf736c03a', 25),
(17, 'Hard Disk', 'Electronics', 123, 'Uncaught TypeError: Cannot read properties of undefined (reading \'contains\')\n    at HTMLBodyElemen', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/lt-1.JPG?alt=media&token=56ed9294-d9d4-493a-9ecc-e06e59122d0d', 'https://firebasestorage.googleapis.com/v0/b/add-images-b4898.appspot.com/o/win.JPG?alt=media&token=70356c38-e1fa-43f9-9052-9b2a0350090f', 27);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
