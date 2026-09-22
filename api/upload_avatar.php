<?php
require_once __DIR__ . '/helpers.php';
faav_require_post();
faav_start_session();

/* Solo el propio piloto logueado puede tocar SU avatar: el callsign
   sale siempre de la sesión del servidor, nunca de lo que mande el cliente. */
$cs = $_SESSION['callsign'] ?? '';
if ($cs === '') {
  faav_json(['ok' => false, 'error' => 'Tenés que iniciar sesión primero.'], 401);
}

$pilot = faav_roster_find($cs);
if (!$pilot) {
  faav_json(['ok' => false, 'error' => 'Tu callsign ya no figura en el roster.'], 403);
}

if (!extension_loaded('gd')) {
  faav_json(['ok' => false, 'error' => 'El servidor no tiene la extensión GD habilitada (necesaria para procesar imágenes). Activala desde cPanel (MultiPHP / PHP Extensions) e intentá de nuevo.'], 500);
}

if (empty($_FILES['avatar'])) {
  faav_json(['ok' => false, 'error' => 'No se recibió ninguna imagen.'], 400);
}

$f = $_FILES['avatar'];

if ($f['error'] !== UPLOAD_ERR_OK) {
  $msg = 'No se pudo subir la imagen.';
  if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) {
    $msg = 'La imagen es demasiado pesada para el servidor.';
  }
  faav_json(['ok' => false, 'error' => $msg], 400);
}

/* Límite propio, además del que ya imponga el servidor (upload_max_filesize). */
if ($f['size'] > 5 * 1024 * 1024) {
  faav_json(['ok' => false, 'error' => 'La imagen no puede pesar más de 5 MB.'], 400);
}

$tmp = $f['tmp_name'];

/* getimagesize() no solo mira la extensión: abre el archivo y confirma que
   sea una imagen real, así evitamos que suban un .php disfrazado de .jpg. */
$info = @getimagesize($tmp);
if (!$info) {
  faav_json(['ok' => false, 'error' => 'El archivo no es una imagen válida.'], 400);
}

$mime = $info['mime'];
switch ($mime) {
  case 'image/jpeg':
    $src = @imagecreatefromjpeg($tmp);
    break;
  case 'image/png':
    $src = @imagecreatefrompng($tmp);
    break;
  case 'image/webp':
    if (!function_exists('imagecreatefromwebp')) {
      faav_json(['ok' => false, 'error' => 'El servidor no soporta WEBP. Subí la foto en JPG o PNG.'], 400);
    }
    $src = @imagecreatefromwebp($tmp);
    break;
  default:
    faav_json(['ok' => false, 'error' => 'Formato no soportado. Usá JPG, PNG o WEBP.'], 400);
}

if (!$src) {
  faav_json(['ok' => false, 'error' => 'No se pudo procesar la imagen.'], 400);
}

/* Recorte centrado a cuadrado + reescalado a 512x512.
   Reconstruir la imagen con GD también "limpia" cualquier dato
   extra que no sea la imagen en sí (defensa en profundidad). */
$w = imagesx($src);
$h = imagesy($src);
$side = min($w, $h);
$sx = (int) (($w - $side) / 2);
$sy = (int) (($h - $side) / 2);

$target = min(1080, $side);
$dst = imagecreatetruecolor($target, $target);
imagecopyresampled($dst, $src, 0, 0, $sx, $sy, $target, $target, $side, $side);
imagedestroy($src);

$dir = __DIR__ . '/../img/pilotos';
if (!is_dir($dir)) {
  if (!@mkdir($dir, 0755, true) && !is_dir($dir)) {
    faav_json(['ok' => false, 'error' => 'No se pudo crear la carpeta de destino en el servidor.', 'debug_dir' => realpath(__DIR__ . '/..') . '/img/pilotos'], 500);
  }
}
if (!is_writable($dir)) {
  faav_json(['ok' => false, 'error' => 'La carpeta img/pilotos no tiene permisos de escritura para el servidor.', 'debug_dir' => realpath($dir)], 500);
}

/* Mismo nombre de archivo que ya usa el frontend como convención
   (PILOTS[].avatar = "../img/pilotos/<callsign>.jpg"), con el callsign
   tal cual figura en el roster (con guión), no el normalizado de la sesión. */
$safeCallsign = preg_replace('/[^A-Za-z0-9\-]/', '', $pilot['callsign']);
$filename = $safeCallsign . '.jpg';
$path = $dir . '/' . $filename;

$ok = imagejpeg($dst, $path, 85);
imagedestroy($dst);

if (!$ok || !file_exists($path)) {
  faav_json(['ok' => false, 'error' => 'No se pudo guardar la imagen en el servidor.', 'debug_path' => $path], 500);
}
@chmod($path, 0644);

faav_json([
  'ok' => true,
  'avatar_url' => '../img/pilotos/' . $filename . '?v=' . time(),
  'debug_path' => realpath($path),
]);
