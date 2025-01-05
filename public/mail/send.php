<?php
require_once 'PHPMailer/Exception.php';
require_once 'PHPMailer/PHPMailer.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Données manquantes');
    }

    $mail = new PHPMailer();
    
    // Configuration du destinataire
    $mail->addAddress('seo.ceane@gmail.com');
    
    // Configuration du message
    $mail->Subject('Contact ElectroBorne - ' . $data['name']);
    
    $message = "De : " . $data['name'] . "\n";
    $message .= "Email : " . $data['email'] . "\n\n";
    $message .= "Message :\n" . $data['message'];
    
    $mail->Body($message);
    
    // Envoi
    if (!$mail->send()) {
        throw new Exception('Erreur lors de l\'envoi du mail');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès'
    ]);

} catch (Exception $e) {
    error_log("Erreur d'envoi de mail: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}