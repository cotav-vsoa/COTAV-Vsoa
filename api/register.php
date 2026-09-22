<?php
require_once __DIR__ . '/helpers.php';
cotav_require_post();

$body = cotav_read_json_body();
$callsignRaw = trim($body['callsign'] ?? '');
$emailRaw = trim($body['email'] ?? '');
$pass1 = (string)($body['password'] ?? '');
$pass2 = (string)($body['password2'] ?? '');

$cs = cotav_norm_callsign($callsignRaw);
$email = strtolower($emailRaw);

if ($cs === '') {
  cotav_json(['ok' => false, 'error' => 'Ingresá tu callsign (ej: FAG-212).'], 400);
}

$pilot = cotav_roster_find($cs);
if (!$pilot) {
  cotav_json(['ok' => false, 'error' => 'Ese callsign no figura en el roster del COTAV. Si sos piloto nuevo, contactá a Comando para que te den de alta primero.'], 403);
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  cotav_json(['ok' => false, 'error' => 'Ingresá un email válido.'], 400);
}

if (strlen($pass1) < 8) {
  cotav_json(['ok' => false, 'error' => 'La contraseña debe tener al menos 8 caracteres.'], 400);
}
if ($pass1 !== $pass2) {
  cotav_json(['ok' => false, 'error' => 'Las contraseñas no coinciden.'], 400);
}

$pdo = cotav_db();

$stmt = $pdo->prepare('SELECT id FROM pilotos_auth WHERE callsign = ?');
$stmt->execute([$cs]);
if ($stmt->fetch()) {
  cotav_json(['ok' => false, 'error' => 'Ya existe una cuenta registrada con ese callsign. Iniciá sesión.'], 409);
}

$stmt = $pdo->prepare('SELECT id FROM pilotos_auth WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
  cotav_json(['ok' => false, 'error' => 'Ese email ya está en uso por otra cuenta.'], 409);
}

$hash = password_hash($pass1 . APP_PEPPER, PASSWORD_BCRYPT);

$stmt = $pdo->prepare('INSERT INTO pilotos_auth (callsign, email, password_hash) VALUES (?, ?, ?)');
$stmt->execute([$cs, $email, $hash]);

cotav_start_session();
session_regenerate_id(true);
$_SESSION['callsign'] = $cs;

cotav_json([
  'ok' => true,
  'pilot' => [
    'callsign'   => $pilot['callsign'],
    'name'       => $pilot['name'] ?? '',
    'indicativo' => $pilot['indicativo'] ?? '',
  ],
]);
