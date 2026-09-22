<?php
require_once __DIR__ . '/helpers.php';
cotav_require_post();
cotav_start_session();

$cs = $_SESSION['callsign'] ?? '';
if ($cs === '') {
  cotav_json(['ok' => false, 'error' => 'Tenés que iniciar sesión primero.'], 401);
}

$body = cotav_read_json_body();
$current = (string)($body['current_password'] ?? '');
$new1 = (string)($body['new_password'] ?? '');
$new2 = (string)($body['new_password2'] ?? '');

if (strlen($new1) < 8) {
  cotav_json(['ok' => false, 'error' => 'La nueva contraseña debe tener al menos 8 caracteres.'], 400);
}
if ($new1 !== $new2) {
  cotav_json(['ok' => false, 'error' => 'Las contraseñas nuevas no coinciden.'], 400);
}

$pdo = cotav_db();
$stmt = $pdo->prepare('SELECT id, password_hash FROM pilotos_auth WHERE callsign = ?');
$stmt->execute([$cs]);
$row = $stmt->fetch();
if (!$row || !password_verify($current . APP_PEPPER, $row['password_hash'])) {
  cotav_json(['ok' => false, 'error' => 'La contraseña actual no es correcta.'], 401);
}

$hash = password_hash($new1 . APP_PEPPER, PASSWORD_BCRYPT);
$stmt = $pdo->prepare('UPDATE pilotos_auth SET password_hash = ? WHERE id = ?');
$stmt->execute([$hash, $row['id']]);

cotav_json(['ok' => true]);
