-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2024 a las 16:54:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `perfil`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `m_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `f_name`, `m_name`, `l_name`, `username`, `email`, `password`, `image`, `created_at`) VALUES
(1, 'Emily', 'D.', 'Davis', 'emilydavis', 'emilydavis@example.com', 'hashed_password_4', 'mujer.jfif', '2024-09-15 02:15:48'),
(2, 'David', 'E.', 'Brown', 'davidbrown', 'davidbrown@example.com', 'hashed_password_5', 'hombre.png', '2024-09-15 02:15:48'),
(3, 'Dasxcxcdid', 'h', 'Brxcxcxcodwn', 'dadvixcdbrown', 'davidbrxcown@example.com', '$2b$10$ij4Nc7cfydC0gPFmHcsQMODYbcHPKUo3EIQ2MeFiOB4wkMBAtdMEO', NULL, '2024-09-15 04:32:22'),
(4, 'jose', 'fran', 'rodriguez', 'josefrancisco123', 'josefrancisco281101@gmail.com', '$2b$10$ncYY7EV6Ven0MCG5K1O7Xusun7kxClAliCRkwflwAm7SrEWmUFRM.', 'imageURL', '2024-09-16 13:13:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
