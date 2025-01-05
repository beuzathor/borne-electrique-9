<?php
$data = json_decode(file_get_contents('php://input'), true);

$to = 'seoceane@gmail.com';
$subject = 'Contact ElectroBorne';
$message = "De: {$data['name']}\nEmail: {$data['email']}\n\n{$data['message']}";
$headers = "From: {$data['email']}";

$sent = mail($to, $subject, $message, $headers);

echo json_encode(['success' => $sent]);
?>