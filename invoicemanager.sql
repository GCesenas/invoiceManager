-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2025 at 07:11 AM
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
-- Database: `invoicemanager`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:4:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:13:\"view-invoices\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:15:\"upload-invoices\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:12:\"manage-users\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:3;a:3:{s:1:\"a\";i:9;s:1:\"b\";s:7:\"permiso\";s:1:\"c\";s:3:\"web\";}}s:5:\"roles\";a:2:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:4:\"user\";s:1:\"c\";s:3:\"web\";}}}', 1736488355);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `folio` varchar(255) DEFAULT NULL,
  `transmitter` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `exchange_rate` decimal(10,4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(25, '0001_01_01_000000_create_users_table', 1),
(26, '0001_01_01_000001_create_cache_table', 1),
(27, '0001_01_01_000002_create_jobs_table', 1),
(28, '2025_01_07_235718_create_personal_access_tokens_table', 1),
(29, '2025_01_07_235757_create_permission_tables', 1),
(30, '2025_01_07_235946_create_invoices_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_permissions`
--

INSERT INTO `model_has_permissions` (`permission_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view-invoices', 'web', '2025-01-08 13:44:55', '2025-01-08 13:44:55'),
(2, 'upload-invoices', 'web', '2025-01-08 13:44:55', '2025-01-08 13:44:55'),
(3, 'manage-users', 'web', '2025-01-08 13:44:55', '2025-01-08 13:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'API Access Token', '5a2038088d69899c9ac1a88ac0d8788d959b312c3be0ebd0601de4177559fcda', '[\"*\"]', '2025-01-08 14:14:44', NULL, '2025-01-08 14:00:21', '2025-01-08 14:14:44'),
(2, 'App\\Models\\User', 2, 'API Access Token', 'd39dc62660f8df4c21bf81deba1720cf1c446519c7ea6959d82f96256276d7c3', '[\"*\"]', NULL, NULL, '2025-01-08 14:18:15', '2025-01-08 14:18:15'),
(3, 'App\\Models\\User', 1, 'API Access Token', 'e244f48d1bca31baff4ac1a8057980c1b0ee117f85b8bd01ebbb3a1b4da08647', '[\"*\"]', '2025-01-08 14:20:48', NULL, '2025-01-08 14:20:11', '2025-01-08 14:20:48'),
(4, 'App\\Models\\User', 1, 'API Access Token', '221fa2d4e2e16d19a93f20efc3940b021eaf041b265b65f07c8d9f4165607011', '[\"*\"]', '2025-01-08 14:21:11', NULL, '2025-01-08 14:21:00', '2025-01-08 14:21:11'),
(5, 'App\\Models\\User', 2, 'API Access Token', '1d95cc316d103ebf927d3f6a33a05b466d887bd31a489660594f1e10b6bb4d1d', '[\"*\"]', '2025-01-08 14:22:09', NULL, '2025-01-08 14:21:59', '2025-01-08 14:22:09'),
(6, 'App\\Models\\User', 1, 'API Access Token', '8cfa9b252e3673fc11db48f50e5c51ded3e83c0dc02f97e3158786385e388483', '[\"*\"]', '2025-01-08 14:25:11', NULL, '2025-01-08 14:22:43', '2025-01-08 14:25:11'),
(7, 'App\\Models\\User', 2, 'API Access Token', 'b09d682d549869ea57b839a6e778447ea24d2a078c05c6c125e6c7bce55f3456', '[\"*\"]', '2025-01-08 14:25:23', NULL, '2025-01-08 14:25:22', '2025-01-08 14:25:23'),
(8, 'App\\Models\\User', 2, 'API Access Token', '6fadb09acf51b9558f5de2a472956e06a29bccffc17f4b541e56407a08628ab4', '[\"*\"]', '2025-01-08 14:27:16', NULL, '2025-01-08 14:25:33', '2025-01-08 14:27:16'),
(9, 'App\\Models\\User', 1, 'API Access Token', '2fdc7c8061f275a171def09851e78d468068cadd0e44b5d522cade454b798c9e', '[\"*\"]', '2025-01-08 14:30:40', NULL, '2025-01-08 14:27:26', '2025-01-08 14:30:40'),
(10, 'App\\Models\\User', 2, 'API Access Token', '498c1a169c2fb98a384843747403e7b7c0b9d24bce8e42d3b9ac75941d892303', '[\"*\"]', NULL, NULL, '2025-01-08 14:30:56', '2025-01-08 14:30:56'),
(11, 'App\\Models\\User', 1, 'API Access Token', '85657adb6017c1426a0171b979efb312b5f13a8816383bb9aebed92c6892b817', '[\"*\"]', NULL, NULL, '2025-01-08 14:31:07', '2025-01-08 14:31:07'),
(12, 'App\\Models\\User', 1, 'API Access Token', 'caf34db64f035dcacafbd3058963ad3102aa6b0d58066ce77fa761b9a555544d', '[\"*\"]', NULL, NULL, '2025-01-08 14:31:28', '2025-01-08 14:31:28'),
(13, 'App\\Models\\User', 1, 'API Access Token', 'f923fcd835feaa1d23bf4296fe04391d0e65a65c96074bddd0ae4829f8f76ea3', '[\"*\"]', NULL, NULL, '2025-01-08 14:31:42', '2025-01-08 14:31:42'),
(14, 'App\\Models\\User', 1, 'API Access Token', '7aed874df750bcb3fdb3ad2a96711351d32c303929c475509a87a5bf6a65b44d', '[\"*\"]', '2025-01-08 14:32:23', NULL, '2025-01-08 14:32:12', '2025-01-08 14:32:23'),
(15, 'App\\Models\\User', 1, 'API Access Token', '881c07ae2856b3874c3606ff5b592d7988c3f6c72783068171ca43c2a174d939', '[\"*\"]', '2025-01-08 14:34:09', NULL, '2025-01-08 14:33:14', '2025-01-08 14:34:09'),
(16, 'App\\Models\\User', 1, 'API Access Token', '0afd9b80288ae9d639ad526f235ba1624277e5afbd5b2d7ba882d0f71842e96c', '[\"*\"]', NULL, NULL, '2025-01-08 14:34:14', '2025-01-08 14:34:14'),
(17, 'App\\Models\\User', 2, 'API Access Token', '0bcc5d866624211e4ccab3508122b03bc6f6f8b64f23bc9b68a1d2068e637c60', '[\"*\"]', NULL, NULL, '2025-01-08 14:34:24', '2025-01-08 14:34:24'),
(18, 'App\\Models\\User', 1, 'API Access Token', 'f99a4b63d2af86731d6b77c7f02cbc75f9ce1dbe01b847403256b73e9924b077', '[\"*\"]', '2025-01-08 14:41:03', NULL, '2025-01-08 14:34:31', '2025-01-08 14:41:03'),
(19, 'App\\Models\\User', 1, 'API Access Token', 'b665f81c45f18d57b88c2d8476ad7e8d535c8650db97ee36d93d73130d3411d4', '[\"*\"]', '2025-01-09 05:38:16', NULL, '2025-01-08 14:41:44', '2025-01-09 05:38:16'),
(20, 'App\\Models\\User', 2, 'API Access Token', 'b7ac22635d15669afd7ce161c82232592b1d6f796afc10c9ce8258443d82ee4b', '[\"*\"]', '2025-01-09 05:41:35', NULL, '2025-01-09 05:39:26', '2025-01-09 05:41:35'),
(21, 'App\\Models\\User', 1, 'API Access Token', '8d558c22881e9b3efb089cda4a85723b250434de42a44fab51858b7f17d62580', '[\"*\"]', '2025-01-09 07:53:34', NULL, '2025-01-09 05:41:53', '2025-01-09 07:53:34'),
(22, 'App\\Models\\User', 2, 'API Access Token', 'bc7f58ae3746d5346ebe8d7a2b7de72581ffd4fce14316d922013bf07c03bcc3', '[\"*\"]', '2025-01-09 07:59:01', NULL, '2025-01-09 07:54:04', '2025-01-09 07:59:01'),
(23, 'App\\Models\\User', 1, 'API Access Token', 'cfb2e5a85e562566e2777548eb0c9ed2a5334753b588f5db891dd82523855dca', '[\"*\"]', '2025-01-09 08:21:22', NULL, '2025-01-09 08:00:11', '2025-01-09 08:21:22'),
(24, 'App\\Models\\User', 2, 'API Access Token', 'fe830975037040484b480e4929d570452b5ab5b2296e2a4dad10290412cb6d72', '[\"*\"]', NULL, NULL, '2025-01-09 08:21:41', '2025-01-09 08:21:41'),
(25, 'App\\Models\\User', 1, 'API Access Token', 'e04707c55dba1a36f08c9ae66048deb93528494882279dd9791c4277bdb4895e', '[\"*\"]', '2025-01-09 05:28:39', NULL, '2025-01-09 08:22:05', '2025-01-09 05:28:39'),
(26, 'App\\Models\\User', 1, 'API Access Token', 'ce97210104e36670225ed9f9802a544405d57bfd1bc3dbf791ec1f14d46421f6', '[\"*\"]', '2025-01-09 05:29:50', NULL, '2025-01-09 05:29:43', '2025-01-09 05:29:50'),
(27, 'App\\Models\\User', 1, 'API Access Token', '6804fe46ad69972719cec662fd384f336ae7923e397a39abaa109a6d1e68bf5b', '[\"*\"]', '2025-01-09 05:30:09', NULL, '2025-01-09 05:30:05', '2025-01-09 05:30:09'),
(28, 'App\\Models\\User', 1, 'API Access Token', '31ed0bd98b0270c545207d7e815856e1bf233f2355aa9f35f603add4f0bab349', '[\"*\"]', '2025-01-09 05:31:03', NULL, '2025-01-09 05:30:17', '2025-01-09 05:31:03'),
(29, 'App\\Models\\User', 1, 'API Access Token', 'cae2cabf93fb96ca0cf945d5c1063854fbe402f5c08e944b92d81467157e0a92', '[\"*\"]', '2025-01-09 05:31:41', NULL, '2025-01-09 05:31:36', '2025-01-09 05:31:41'),
(30, 'App\\Models\\User', 1, 'API Access Token', '4572354f4effa33992a09aebda2cffb98e69390104d8375aaecaa2730d74b7c1', '[\"*\"]', '2025-01-09 05:32:43', NULL, '2025-01-09 05:32:37', '2025-01-09 05:32:43'),
(31, 'App\\Models\\User', 1, 'API Access Token', 'eb04c7a9e5df68b9c80c6535fd976eb4fa522fccd4557d810841f8b8e7a4e61a', '[\"*\"]', '2025-01-09 05:33:14', NULL, '2025-01-09 05:33:10', '2025-01-09 05:33:14'),
(32, 'App\\Models\\User', 1, 'API Access Token', '63cba8337eec15d624fb195550330d88533e8c4647adb55e21c2c26bf9f836ba', '[\"*\"]', '2025-01-09 05:33:29', NULL, '2025-01-09 05:33:27', '2025-01-09 05:33:29'),
(33, 'App\\Models\\User', 1, 'API Access Token', '700a0fb65d3421a788868aba9194a1b00c1fc1d40746888392e79e9aaab81424', '[\"*\"]', '2025-01-09 05:35:46', NULL, '2025-01-09 05:35:45', '2025-01-09 05:35:46'),
(34, 'App\\Models\\User', 1, 'API Access Token', 'fd50617c2f29f8c1bdaf907c5ea84620e0b25393fc20f578260ccf42e01dc15e', '[\"*\"]', '2025-01-09 05:38:40', NULL, '2025-01-09 05:35:55', '2025-01-09 05:38:40'),
(35, 'App\\Models\\User', 1, 'API Access Token', '07f016daeb58194601b1f3276f70f88394bc6b55e45adb9b20938c51ecc91baf', '[\"*\"]', '2025-01-09 05:43:18', NULL, '2025-01-09 05:38:52', '2025-01-09 05:43:18'),
(36, 'App\\Models\\User', 1, 'API Access Token', '8b88ee9265a6ea60b7400f974eed336b7581e852e0b795cdfb16f08953a42db3', '[\"*\"]', '2025-01-09 05:43:31', NULL, '2025-01-09 05:43:29', '2025-01-09 05:43:31'),
(37, 'App\\Models\\User', 1, 'API Access Token', '071c014fa3f167c39c93ffceb771236b09175e7c05bb4cfb6328eb194e3ad775', '[\"*\"]', '2025-01-09 05:43:44', NULL, '2025-01-09 05:43:42', '2025-01-09 05:43:44'),
(38, 'App\\Models\\User', 1, 'API Access Token', 'ac214d2667553e74f21d7d8d06f2f9841c7faa5507646be8a9cf0e3a80c81670', '[\"*\"]', '2025-01-09 05:44:47', NULL, '2025-01-09 05:43:50', '2025-01-09 05:44:47'),
(39, 'App\\Models\\User', 1, 'API Access Token', 'fcd9a16fac1401f73585d9b076bb87f0ad03d90af1517eb9d0dd91538eb7f06e', '[\"*\"]', '2025-01-09 05:48:34', NULL, '2025-01-09 05:44:55', '2025-01-09 05:48:34'),
(40, 'App\\Models\\User', 1, 'API Access Token', '062b84c37a61ee6474d22e865e8d015230929c6ca16982074f80b98589e0b42a', '[\"*\"]', '2025-01-09 05:49:29', NULL, '2025-01-09 05:48:40', '2025-01-09 05:49:29'),
(41, 'App\\Models\\User', 12, 'API Access Token', '9627714b51c9e2d4c6e133eb317beaa850a6c90f1fe0160b073e02e5b2a37ba0', '[\"*\"]', '2025-01-09 05:51:13', NULL, '2025-01-09 05:51:08', '2025-01-09 05:51:13'),
(42, 'App\\Models\\User', 1, 'API Access Token', 'd45391e4f0b93b255f1875576eabb5d5dab08027a92cd74cc3ea70812855a2d3', '[\"*\"]', '2025-01-09 05:53:01', NULL, '2025-01-09 05:51:28', '2025-01-09 05:53:01');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-01-08 13:44:55', '2025-01-08 13:44:55'),
(2, 'user', 'web', '2025-01-08 13:44:55', '2025-01-08 13:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2m54Kk8QVWEDghArpb9pAdiWsYqobFE4XwFlykp6', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakNZQWNxUk5BeG5TQVRkeEw3OWxUQTJ3Q3RrZDQ0cHFJTXBwQ2NNSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvYWRtaW4vdXNlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1736401981);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Gerardo Ceseñas', 'gcesenasrivera@gmail.com', NULL, '$2y$12$y4O0xqz57BIOVu9bxrUliOU0nlTz78aiUSPSjvh6lJ7S8ZSsRCcYm', NULL, '2025-01-08 14:00:08', '2025-01-08 14:00:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
