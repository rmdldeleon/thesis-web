-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2024 at 03:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `custom_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `AccountID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `ExpirationDate` datetime NOT NULL,
  `Firstname` varchar(255) NOT NULL,
  `Lastname` varchar(255) NOT NULL,
  `Origin` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `LastUsedDSBatch` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `actionresults`
--

CREATE TABLE `actionresults` (
  `ActionNumber` int(11) NOT NULL,
  `ActionSet` int(11) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `DSBatch` int(11) NOT NULL,
  `DSID` int(11) NOT NULL,
  `DSName` varchar(255) NOT NULL,
  `ActionType` varchar(255) NOT NULL,
  `StartingIndex` int(11) NOT NULL,
  `EndIndex_Count` int(11) NOT NULL,
  `Direction` varchar(255) NOT NULL,
  `SpeedMS` float NOT NULL,
  `SpeedNotation` varchar(255) NOT NULL,
  `Size` int(11) NOT NULL,
  `SizePointers` int(11) NOT NULL,
  `PointersAdded` int(11) NOT NULL,
  `SizeAdded` int(11) NOT NULL,
  `SpaceOccupied` int(11) NOT NULL,
  `SpaceNotation` varchar(255) NOT NULL,
  `SpaceAdded` int(11) NOT NULL,
  `ThreadsUsed` int(11) NOT NULL,
  `JSONResults` longtext NOT NULL,
  `JSONData` text NOT NULL,
  `ActionDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `archivedas`
--

CREATE TABLE `archivedas` (
  `ActionNumber` int(11) NOT NULL,
  `ActionSet` int(11) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `DSBatch` int(11) NOT NULL,
  `DSID` int(11) NOT NULL,
  `DSName` varchar(255) NOT NULL,
  `ActionType` varchar(255) NOT NULL,
  `StartingIndex` int(11) NOT NULL,
  `EndIndex_Count` int(11) NOT NULL,
  `Direction` varchar(255) NOT NULL,
  `SpeedMS` float NOT NULL,
  `SpeedNotation` varchar(255) NOT NULL,
  `Size` int(11) NOT NULL,
  `SizePointers` int(11) NOT NULL,
  `PointersAdded` int(11) NOT NULL,
  `SizeAdded` int(11) NOT NULL,
  `SpaceOccupied` int(11) NOT NULL,
  `SpaceNotation` varchar(255) NOT NULL,
  `SpaceAdded` int(11) NOT NULL,
  `ThreadsUsed` int(11) NOT NULL,
  `JSONResults` longtext NOT NULL,
  `JSONData` text NOT NULL,
  `ActionDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `datastructures`
--

CREATE TABLE `datastructures` (
  `DSID` int(11) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `DSBatch` int(11) NOT NULL,
  `DSName` varchar(255) NOT NULL,
  `Threaded` tinyint(1) NOT NULL,
  `Frequency` int(11) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  `Type` varchar(255) NOT NULL,
  `UserAddedPivot` tinyint(1) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `actionresults`
--
ALTER TABLE `actionresults`
  ADD PRIMARY KEY (`ActionNumber`),
  ADD KEY `AccountID` (`AccountID`),
  ADD KEY `DSID` (`DSID`);

--
-- Indexes for table `archivedas`
--
ALTER TABLE `archivedas`
  ADD PRIMARY KEY (`ActionNumber`),
  ADD KEY `AccountID` (`AccountID`);

--
-- Indexes for table `datastructures`
--
ALTER TABLE `datastructures`
  ADD PRIMARY KEY (`DSID`),
  ADD KEY `AccountID` (`AccountID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `AccountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `actionresults`
--
ALTER TABLE `actionresults`
  MODIFY `ActionNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `datastructures`
--
ALTER TABLE `datastructures`
  MODIFY `DSID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actionresults`
--
ALTER TABLE `actionresults`
  ADD CONSTRAINT `actionresults_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `accounts` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `actionresults_ibfk_2` FOREIGN KEY (`DSID`) REFERENCES `datastructures` (`DSID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `archivedas`
--
ALTER TABLE `archivedas`
  ADD CONSTRAINT `archivedas_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `accounts` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `datastructures`
--
ALTER TABLE `datastructures`
  ADD CONSTRAINT `datastructures_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `accounts` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
