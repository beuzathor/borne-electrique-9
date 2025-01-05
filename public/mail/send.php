<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    // Gestion des requêtes OPTIONS (CORS)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Récupération des données
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Données manquantes');
    }

    // Nettoyage et validation des données
    $name = htmlspecialchars(trim($data['name']));
    $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($data['message']));

    if (!$email) {
        throw new Exception('Adresse email invalide');
    }

    // Configuration email
    $to = 'seo.ceane@gmail.com';
    $from_email = 'contact@installer-borne-recharge.fr'; // Utilisez une adresse de votre domaine
    $subject = 'Contact ElectroBorne - ' . $name;

    // Message en HTML
    $message_html = "
    <html>
    <head>
        <title>Nouveau message de contact</title>
    </head>
    <body>
        <h2>Nouveau message de ElectroBorne</h2>
        <p><strong>De :</strong> {$name}</p>
        <p><strong>Email du contact :</strong> {$email}</p>
        <h3>Message :</h3>
        <p>" . nl2br($message) . "</p>
    </body>
    </html>";

    // Message en texte brut (fallback)
    $message_txt = "Nouveau message de ElectroBorne\n\n";
    $message_txt .= "De : {$name}\n";
    $message_txt .= "Email du contact : {$email}\n\n";
    $message_txt .= "Message :\n{$message}";

    // Création d'une frontière unique pour le multipart
    $boundary = md5(uniqid(time()));

    // En-têtes de l'email
    $headers = array(
        'MIME-Version: 1.0',
        'From: ElectroBorne <' . $from_email . '>', // Utilisation de l'adresse fixe
        'Reply-To: ' . $email, // L'adresse de réponse reste celle du contact
        'Return-Path: ' . $from_email, // Adresse pour les bounces
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"'
    );

    // Corps complet du message
    $body = "";
    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message_txt . "\r\n\r\n";

    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message_html . "\r\n\r\n";

    $body .= "--" . $boundary . "--";

    // Log pour debug
    error_log("Tentative d'envoi de mail à {$to} depuis {$from_email}");

    // Envoi
    $sent = mail($to, $subject, $body, implode("\r\n", $headers));
    
    if (!$sent) {
        error_log("Échec de l'envoi du mail : " . error_get_last()['message']);
        throw new Exception('Échec de l\'envoi');
    }

    error_log("Mail envoyé avec succès à {$to}");
    
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès'
    ]);

} catch (Exception $e) {
    error_log("Erreur lors de l'envoi du mail : " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>