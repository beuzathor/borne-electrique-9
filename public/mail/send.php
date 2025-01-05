<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    // Récupération des données
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Données manquantes');
    }

    // Configuration email
    $to = 'seo.ceane@gmail.com';
    $subject = 'Contact ElectroBorne';
    $message = "De: {$data['name']}\nEmail: {$data['email']}\n\nMessage:\n{$data['message']}";
    $headers = "From: {$data['email']}";

    // Envoi
    $sent = mail($to, $subject, $message, $headers);

    if (!$sent) {
        throw new Exception('Échec de l\'envoi');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>