<?php
/**
 * Configuración de conexión a la base de datos MySQL de cPanel.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'cotavirt_pilotos');
define('DB_USER', 'cotavirt_admin');
define('DB_PASS', 'COT@virtu@l2030');

/**
 * Clave secreta usada para reforzar el hash de las contraseñas (pepper).
 */
define('APP_PEPPER', 'x8f9d7s6f5g4h3j2k1l0p9o8i7u6y5t4z1x2c3v4b5n6m');

/**
 * Si tu sitio ya corre bajo HTTPS (recomendado), dejá esto en true.
 */
define('APP_FORCE_SECURE_COOKIE', true);