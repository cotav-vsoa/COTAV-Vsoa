<?php
// Configuración de encabezados para CORS y JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Cargar archivos de configuración y helpers para garantizar que APP_PEPPER y la conexión estén disponibles
if (file_exists(__DIR__ . '/db.php')) {
    require_once __DIR__ . '/db.php';
} elseif (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

if (file_exists(__DIR__ . '/helpers.php')) {
    require_once __DIR__ . '/helpers.php';
}

// Configuración de conexión a la Base de Datos (credenciales en api/config.php, fuera del repo)
$db_host = defined('DB_HOST') ? DB_HOST : 'localhost';
$db_user = defined('DB_USER') ? DB_USER : '';
$db_pass = defined('DB_PASS') ? DB_PASS : '';
$db_name = defined('DB_NAME') ? DB_NAME : '';

// Leer payload JSON recibido
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$token = trim($data['token'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($token) || strlen($password) < 6) {
    echo json_encode(['ok' => false, 'error' => 'Datos inválidos. La contraseña debe tener al menos 6 caracteres.']);
    exit;
}

// Conexión MySQLi
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    echo json_encode(['ok' => false, 'error' => 'Error de conexión con el servidor.']);
    exit;
}

// Buscar el usuario que posea este token y verificar que NO haya expirado
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE reset_token = ? AND reset_expires > NOW() LIMIT 1");
$stmt->bind_param("s", $token);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    // Obtener pepper definido en el sistema
    $pepper = defined('APP_PEPPER') ? APP_PEPPER : '';

    // Generar Hash seguro aplicando Pepper de forma idéntica a login.php
    $passHash = password_hash($password . $pepper, PASSWORD_DEFAULT);

    // Actualizar la contraseña e invalidar el token
    $updateStmt = $conn->prepare("UPDATE usuarios SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
    $updateStmt->bind_param("si", $passHash, $row['id']);
    
    if ($updateStmt->execute()) {
        echo json_encode(['ok' => true]);
    } else {
        echo json_encode(['ok' => false, 'error' => 'No se pudo actualizar la contraseña.']);
    }
    
    $updateStmt->close();
} else {
    echo json_encode(['ok' => false, 'error' => 'El enlace es inválido o ha expirado. Solicitá uno nuevo.']);
}

$stmt->close();
$conn->close();
?>