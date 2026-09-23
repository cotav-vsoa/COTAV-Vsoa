<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/helpers.php';

// Cargar archivos de PHPMailer
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

cotav_cors();
cotav_require_post();

$data = cotav_read_json_body();
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$email) {
    cotav_json(['ok' => false, 'error' => 'Por favor, ingresá un correo electrónico válido.'], 400);
}

$pdo = cotav_db();

// Buscar al usuario por correo
$stmt = $pdo->prepare('SELECT id, callsign, email FROM usuarios WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$row = $stmt->fetch();

if ($row) {
    // Generar token criptográfico único y expiración (1 hora)
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Guardar el token en la base de datos
    $updateStmt = $pdo->prepare('UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE id = ?');
    $updateStmt->execute([$token, $expires, $row['id']]);

    // Enlace de restablecimiento hacia GitHub Pages
    // Cambiá el enlace para que apunte a tu servidor:
    $resetLink = "https://cotavirtual.com.ar/HTML/restablecer.html?token=" . $token;

    // Configuración y envío vía PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Ajustes del servidor SMTP (credenciales en api/config.php, fuera del repo)
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = defined('SMTP_PORT') ? SMTP_PORT : 465;
        $mail->CharSet    = 'UTF-8';

        // Remitente y Destinatario
        $mail->setFrom(SMTP_FROM, 'COTA - VIRTUAL');
        $mail->addAddress($row['email']);
        $mail->addReplyTo(SMTP_FROM, 'COTA - VIRTUAL');

        // Contenido HTML
        $mail->isHTML(true);
        $mail->Subject = "Restablecer contraseña · COTA - VIRTUAL";

        $mail->Body = "
        <!DOCTYPE html>
        <html lang='es'>
        <head>
          <meta charset='UTF-8'>
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0b0e14; color: #f0f4f8; margin: 0; padding: 20px; }
            .card { max-width: 520px; margin: 0 auto; background-color: #121824; border: 1px solid #1f293d; border-radius: 4px; padding: 30px; }
            .brand { font-size: 18px; font-weight: bold; color: #4a90e2; letter-spacing: 1px; margin-bottom: 20px; text-transform: uppercase; }
            h1 { font-size: 20px; margin-top: 0; color: #ffffff; }
            p { font-size: 14px; line-height: 1.6; color: #a0aec0; }
            .btn-box { margin: 28px 0; }
            .btn { display: inline-block; padding: 12px 24px; background-color: #4a90e2; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
            .footer { font-size: 11px; color: #5a6a85; margin-top: 24px; border-top: 1px solid #1f293d; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class='card'>
            <div class='brand'>COTA - VIRTUAL</div>
            <h1>Solicitud de restablecimiento de contraseña</h1>
            <p>Hola <strong>" . htmlspecialchars($row['callsign']) . "</strong>,</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta de piloto en el Comando Aéreo Táctico Argentino Virtual.</p>
            <p>Hacé clic en el siguiente botón para ingresar tu nueva clave:</p>
            <div class='btn-box'>
              <a href='{$resetLink}' class='btn'>Restablecer Contraseña</a>
            </div>
            <p style='font-size: 12px; color: #718096;'>Si el botón no funciona, copiá y pegá el siguiente enlace en tu navegador:<br><a href='{$resetLink}' style='color:#4a90e2; word-break:break-all;'>{$resetLink}</a></p>
            <div class='footer'>
              <p>Este enlace es válido durante 1 hora.<br>Si no solicitaste este cambio, podés ignorar este correo de forma segura.</p>
            </div>
          </div>
        </body>
        </html>
        ";

        $mail->AltBody = "Hola " . $row['callsign'] . ",\n\nCopiá y pegá el siguiente enlace en tu navegador para restablecer tu contraseña:\n" . $resetLink;

        $mail->send();
    } catch (Exception $e) {
        // En desarrollo podés registrar el error: error_log($mail->ErrorInfo);
    }
}

// Responder siempre ok: true para prevenir la enumeración de emails
cotav_json(['ok' => true]);