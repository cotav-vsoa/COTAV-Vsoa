<?php
require_once __DIR__ . '/helpers.php';
faav_start_session();

$cs = $_SESSION['callsign'] ?? '';
if ($cs === '') {
  faav_json(['ok' => true, 'logged' => false]);
}

$pilot = faav_roster_find($cs);
if (!$pilot) {
  // El callsign quedó en sesión pero ya no está en el roster.
  faav_json(['ok' => true, 'logged' => false]);
}

faav_json([
  'ok' => true,
  'logged' => true,
  'pilot' => [
    'callsign'   => $pilot['callsign'],
    'name'       => $pilot['name'] ?? '',
    'indicativo' => $pilot['indicativo'] ?? '',
  ],
]);
