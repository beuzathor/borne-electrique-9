<?php
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

    // Configuration SMTP
    ini_set('SMTP', 'mail.installer-borne-recharge.fr');
    ini_set('smtp_port', 465);
    ini_set('username', 'contact@installer-borne-recharge.fr');
    ini_set('password', '$bKAa47nnU04'); // Remplacez par votre vrai mot de passe
    
    $to = 'seo.ceane@gmail.com';
    $subject = 'Contact ElectroBorne - ' . $data['name'];
    
    $message = "De : " . $data['name'] . "\n";
    $message .= "Email : " . $data['email'] . "\n\n";
    $message .= "Message :\n" . $data['message'];

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/plain; charset=UTF-8';
    $headers[] = 'From: ElectroBorne <contact@installer-borne-recharge.fr>';
    $headers[] = 'Reply-To: ' . $data['email'];
    
    $sent = mail($to, $subject, $message, implode("\r\n", $headers));
    
    if (!$sent) {
        $error = error_get_last();
        throw new Exception('Échec de l\'envoi: ' . ($error['message'] ?? 'Erreur inconnue'));
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
?>