<?php
require_once __DIR__ . '/helpers.php';
cotav_start_session();

$cs = $_SESSION['callsign'] ?? '';
if ($cs === '') {
  cotav_json(['ok' => true, 'logged' => false]);
}

$pilot = cotav_roster_find($cs);
if (!$pilot) {
  // El callsign quedó en sesión pero ya no está en el roster.
  cotav_json(['ok' => true, 'logged' => false]);
}

cotav_json([
  'ok' => true,
  'logged' => true,
  'pilot' => [
    'callsign'   => $pilot['callsign'],
    'name'       => $pilot['name'] ?? '',
    'indicativo' => $pilot['indicativo'] ?? '',
  ],
]);
