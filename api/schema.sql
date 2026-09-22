-- Ejecutar este script una vez desde phpMyAdmin (cPanel -> phpMyAdmin),
-- dentro de la base de datos que creaste para el sitio (ej: tuusuario_cotav).
--
-- Si ya habías creado la tabla ANTES (versión sin email) y ya tenés pilotos
-- registrados, no vuelvas a correr el CREATE TABLE: corré en cambio esto
-- (ajustando el mail de cada uno a mano, o pidiéndoselos):
--   ALTER TABLE pilotos_auth ADD COLUMN email VARCHAR(190) NOT NULL UNIQUE AFTER callsign;

CREATE TABLE IF NOT EXISTS pilotos_auth (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  callsign        VARCHAR(20) NOT NULL UNIQUE,   -- normalizado: solo A-Z0-9, ej "FAG212"
  email           VARCHAR(190) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at   DATETIME NULL,
  failed_attempts INT NOT NULL DEFAULT 0,
  locked_until    DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
