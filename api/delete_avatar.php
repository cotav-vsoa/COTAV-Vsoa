<?php
require_once __DIR__ . '/helpers.php';
faav_require_post();
faav_start_session();

$cs = $_SESSION['callsign'] ?? '';
if ($cs === '') {
  faav_json(['ok' => false, 'error' => 'Tenés que iniciar sesión primero.'], 401);
}

$pilot = faav_roster_find($cs);
if (!$pilot) {
  faav_json(['ok' => false, 'error' => 'Tu callsign ya no figura en el roster.'], 403);
}

$safeCallsign = preg_replace('/[^A-Za-z0-9\-]/', '', $pilot['callsign']);
$path = __DIR__ . '/../img/pilotos/' . $safeCallsign . '.jpg';

if (is_file($path)) {
  @unlink($path);
}

faav_json(['ok' => true]);
