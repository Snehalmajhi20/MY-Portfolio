<?php
// ── Contact Form Handler ─────────────────────────────────────────────────────
// Receives POST data from the AJAX contact form and sends email via PHP mail().
// Works on all standard PHP web hosts (cPanel, Hostinger, GoDaddy, etc.)
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: text/plain; charset=utf-8');

// ── Your receiving email ─────────────────────────────────────────────────────
$receiving_email = 'snehalmajhi20@gmail.com';

// ── Only accept POST requests ────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

// ── Sanitize & validate inputs ───────────────────────────────────────────────
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo 'Please fill in all fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Invalid email address.';
    exit;
}

// ── Build email ──────────────────────────────────────────────────────────────
$email_subject = '[Portfolio Contact] ' . $subject;

$email_body  = "You received a new message from your portfolio contact form.\n";
$email_body .= "────────────────────────────────────────\n";
$email_body .= "Name    : " . $name    . "\n";
$email_body .= "Email   : " . $email   . "\n";
$email_body .= "Subject : " . $subject . "\n";
$email_body .= "────────────────────────────────────────\n";
$email_body .= "Message :\n" . $message . "\n";
$email_body .= "────────────────────────────────────────\n";
$email_body .= "Sent from: " . ($_SERVER['HTTP_REFERER'] ?? 'your portfolio site') . "\n";

$headers  = "From: Portfolio Contact Form <no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'yoursite.com') . ">\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ── Send email ───────────────────────────────────────────────────────────────
$sent = mail($receiving_email, $email_subject, $email_body, $headers);

if ($sent) {
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Could not send the message. Please try again or email me directly at snehalmajhi20@gmail.com';
}
?>
