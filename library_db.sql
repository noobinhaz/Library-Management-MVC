-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2023 at 09:26 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `dob`) VALUES
(1, 'J.K. Rowling', '1965-07-31'),
(2, 'George Orwell', '1903-06-25'),
(3, 'Harper Lee', '1926-04-28'),
(4, 'Agatha Christie', '1890-09-15'),
(5, 'Stephen King', '1947-09-21'),
(6, 'Shayree', '2001-01-01'),
(7, 'Shayree', '2000-01-01'),
(8, 'Max', '1990-01-01'),
(14, 'Max', '2000-01-01'),
(16, 'Etu', '1990-01-01'),
(17, 'Fatema', '1998-11-11'),
(18, 'Fatema', '1998-11-11');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `isbn_code` varchar(190) NOT NULL,
  `sbn_code` varchar(190) NOT NULL,
  `release_date` date DEFAULT NULL,
  `shelf_position` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `version`, `author_id`, `isbn_code`, `sbn_code`, `release_date`, `shelf_position`) VALUES
(1, 'Harry Potter and the Sorcerer\'s Stone', '1st Edition', 1, '9780590353427', '123-456-789-0', '1997-06-26', 'A1'),
(2, '1984', '1st Edition', 2, '9780451524935', '987-654-321-0', '1949-06-08', 'B2'),
(4, 'Murder on the Orient Express', '1st Edition', 4, '9780062693662', '987-654-321-0', '1934-01-01', 'D4'),
(5, 'The Shining', '1st Edition', 5, '9780385121675', '123-456-789-0', '1977-01-28', 'E5'),
(9, 'A life of journey and learning', '1', 16, '12f14-4fg5-64ggg', 'sbn-123', '2023-01-01', '6Z');

-- --------------------------------------------------------

--
-- Table structure for table `book_borrows`
--

CREATE TABLE `book_borrows` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `borrow_date` date DEFAULT current_timestamp(),
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_borrows`
--

INSERT INTO `book_borrows` (`id`, `user_id`, `book_id`, `borrow_date`, `return_date`) VALUES
(1, 3, 1, '2022-02-01', '2022-02-15'),
(2, 4, 2, '2022-03-10', '2022-03-25'),
(3, 3, 3, '2022-04-05', NULL),
(4, 3, 5, '0000-00-00', '0000-00-00'),
(5, 4, 4, '0000-00-00', '0000-00-00'),
(6, 4, 4, '0000-00-00', '0000-00-00'),
(7, 4, 4, '2023-04-03', '2023-04-05'),
(8, 4, 4, '0000-00-00', '0000-00-00'),
(9, 4, 4, '0000-00-00', '0000-00-00'),
(10, 4, 4, '2023-04-03', '0000-00-00'),
(11, 4, 4, '0000-00-00', '0000-00-00'),
(12, 4, 4, '0000-00-00', '0000-00-00'),
(13, 4, 4, '2023-01-02', '0000-00-00'),
(14, 4, 4, '2023-01-02', '2023-10-14'),
(15, 4, 4, '2023-04-03', '2023-10-14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('librarian','student') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Librarian 1', 'librarian1@example.com', '$2y$10$ZNiaa3B7vc0b8gW3bLuxAu6Q.IcgB/5FP24tREHdP8PIKJ8DsfZyC', 'librarian'),
(2, 'Librarian 2', 'librarian2@example.com', '$2y$10$ZNiaa3B7vc0b8gW3bLuxAu6Q.IcgB/5FP24tREHdP8PIKJ8DsfZyC', 'librarian'),
(3, 'Student 1', 'student1@example.com', '$2y$10$ZNiaa3B7vc0b8gW3bLuxAu6Q.IcgB/5FP24tREHdP8PIKJ8DsfZyC', 'student'),
(4, 'Student 2', 'student2@example.com', '$2y$10$ZNiaa3B7vc0b8gW3bLuxAu6Q.IcgB/5FP24tREHdP8PIKJ8DsfZyC', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_borrows`
--
ALTER TABLE `book_borrows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `book_borrows`
--
ALTER TABLE `book_borrows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
