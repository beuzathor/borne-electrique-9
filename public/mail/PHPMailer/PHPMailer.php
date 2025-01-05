<?php
namespace PHPMailer\PHPMailer;

class PHPMailer {
    public $SMTPDebug = 0;
    public $Mailer = "smtp";
    public $Host = "mail.installer-borne-recharge.fr";
    public $Port = 465;
    public $SMTPAuth = true;
    public $Username = "contact@installer-borne-recharge.fr";
    public $Password = '$bKAa47nnU04';
    public $SMTPSecure = "ssl";
    public $CharSet = 'UTF-8';
    public $From = "contact@installer-borne-recharge.fr";
    public $FromName = "ElectroBorne";
    
    private $to = '';
    private $subject = '';
    private $body = '';
    
    public function addAddress($address) {
        $this->to = $address;
    }
    
    public function Subject($subject) {
        $this->subject = $subject;
    }
    
    public function Body($body) {
        $this->body = $body;
    }
    
    public function send() {
        try {
            $headers = array(
                'From: ' . $this->From,
                'Reply-To: ' . $this->From,
                'X-Mailer: PHP/' . phpversion(),
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=UTF-8'
            );
            
            return mail($this->to, $this->subject, $this->body, implode("\r\n", $headers));
        } catch (\Exception $e) {
            return false;
        }
    }
}