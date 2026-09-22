<?php
require_once __DIR__ . '/helpers.php';
cotav_require_post();

$body = cotav_read_json_body();
$callsignRaw = trim($body['callsign'] ?? '');
$pass = (string)($body['password'] ?? '');

$cs = cotav_norm_callsign($callsignRaw);
$genericError = 'Usuario o contraseña incorrectos.';

if ($cs === '' || $pass === '') {
  cotav_json(['ok' => false, 'error' => $genericError], 401);
}

$pdo = cotav_db();
$stmt = $pdo->prepare('SELECT id, password_hash, failed_attempts, locked_until FROM pilotos_auth WHERE callsign = ?');
$stmt->execute([$cs]);
$row = $stmt->fetch();

if (!$row) {
  // No existe la cuenta: puede que el piloto todavía no se haya registrado.
  cotav_json(['ok' => false, 'error' => $genericError, 'not_registered' => true], 401);
}

$now = new DateTime();
if (!empty($row['locked_until'])) {
  $lockedUntil = new DateTime($row['locked_until']);
  if ($lockedUntil > $now) {
    $mins = ceil(($lockedUntil->getTimestamp() - $now->getTimestamp()) / 60);
    cotav_json(['ok' => false, 'error' => "Cuenta bloqueada temporalmente por demasiados intentos fallidos. Probá de nuevo en $mins minuto(s)."], 429);
  }
}

if (!password_verify($pass . APP_PEPPER, $row['password_hash'])) {
  $attempts = (int)$row['failed_attempts'] + 1;
  $lockSql = '';
  $params = [$attempts];
  if ($attempts >= 5) {
    $lockSql = ', locked_until = DATE_ADD(NOW(), INTERVAL 15 MINUTE)';
  }
  $stmt = $pdo->prepare("UPDATE pilotos_auth SET failed_attempts = ?$lockSql WHERE id = ?");
  $params[] = $row['id'];
  $stmt->execute($params);
  cotav_json(['ok' => false, 'error' => $genericError], 401);
}

// Login correcto: resetear contador y guardar sesión.
$stmt = $pdo->prepare('UPDATE pilotos_auth SET failed_attempts = 0, locked_until = NULL, last_login_at = NOW() WHERE id = ?');
$stmt->execute([$row['id']]);

$pilot = cotav_roster_find($cs);

cotav_start_session();
session_regenerate_id(true);
$_SESSION['callsign'] = $cs;

cotav_json([
  'ok' => true,
  'pilot' => [
    'callsign'   => $pilot['callsign'] ?? $cs,
    'name'       => $pilot['name'] ?? '',
    'indicativo' => $pilot['indicativo'] ?? '',
  ],
]);
