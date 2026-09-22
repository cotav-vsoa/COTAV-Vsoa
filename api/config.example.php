<?php
/**
 * Plantilla de configuración. NO VERSIONAR credenciales reales.
 *
 * Para poner el sitio en un servidor (hosting con MySQL):
 *   1. Copiá este archivo como api/config.php
 *   2. Completá los datos de tu base de datos de cPanel
 *   3. NUNCA subas config.php a GitHub (está en .gitignore)
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'TU_BASE_DE_DATOS');
define('DB_USER', 'TU_USUARIO');
define('DB_PASS', 'TU_CONTRASENA');

/**
 * Clave secreta usada para reforzar el hash de las contraseñas (pepper).
 * Generá una nueva larga y aleatoria por servidor.
 */
define('APP_PEPPER', 'CAMBIAME_POR_UNA_CLAVE_LARGA_Y_ALEATORIA');

/**
 * Si tu sitio ya corre bajo HTTPS (recomendado), dejá esto en true.
 */
define('APP_FORCE_SECURE_COOKIE', true);