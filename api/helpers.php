<?php
require_once __DIR__ . '/config.php';

/* ---------- CORS: permitir llamadas desde GitHub Pages y el sitio principal ---------- */
function cotav_cors() {
  $allowedOrigins = [
    'https://cotav-vsoa.github.io',
    'https://cotavirtual.com.ar',
    'https://www.cotavirtual.com.ar'
  ];
  
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = rtrim($_SERVER['HTTP_ORIGIN'], '/');
    if (in_array($origin, $allowedOrigins, true)) {
      header('Access-Control-Allow-Origin: ' . $origin);
      header('Vary: Origin');
      header('Access-Control-Allow-Credentials: true');
    }
  }
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
  }
}

/* ---------- sesión (cookie HttpOnly, no accesible desde JS) ---------- */
function cotav_start_session() {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  $secure = APP_FORCE_SECURE_COOKIE || (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
  session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 30, // 30 días
    'path'     => '/',
    'domain'   => '',
    'secure'   => $secure,
    'httponly' => true,
    'samesite' => 'Lax',
  ]);
  session_name('cotav_session');
  session_start();
}

/* ---------- respuestas JSON ---------- */
function cotav_json($data, $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

function cotav_read_json_body() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

/* ---------- normalización de callsign ----------
   Permite conservar el guion medio (ej. "FAG-212") tal como se guarda en la BD */
function cotav_norm_callsign($s) {
  $s = strtoupper(trim((string)$s));
  return preg_replace('/[^A-Z0-9-]/', '', $s);
}

/* ---------- conexión PDO ---------- */
function cotav_db() {
  static $pdo = null;
  if ($pdo) return $pdo;
  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
  try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  } catch (PDOException $e) {
    cotav_json(['ok' => false, 'error' => 'No se pudo conectar a la base de datos.'], 500);
  }
  return $pdo;
}

/* ---------- roster: lista oficial de callsigns válidos ---------- */
function cotav_roster() {
  static $roster = null;
  if ($roster !== null) return $roster;
  $path = __DIR__ . '/../data/roster.json';
  $json = @file_get_contents($path);
  $arr = $json ? json_decode($json, true) : [];
  $roster = is_array($arr) ? $arr : [];
  return $roster;
}

function cotav_roster_find($normCallsign) {
  foreach (cotav_roster() as $p) {
    if (cotav_norm_callsign($p['callsign'] ?? '') === $normCallsign) return $p;
  }
  return null;
}

/* ---------- solo permitir POST ---------- */
function cotav_require_post() {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    cotav_json(['ok' => false, 'error' => 'Método no permitido.'], 405);
  }
}