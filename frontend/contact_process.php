<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"] ?? ''));
    $event_type = strip_tags(trim($_POST["event-type"] ?? ''));
    $event_date = strip_tags(trim($_POST["event-date"] ?? ''));
    $details = strip_tags(trim($_POST["details"] ?? ''));

    if (empty($name) || empty($email) || empty($phone) || empty($event_type) || empty($event_date)) {
        http_response_code(400);
        echo "Please fill all required fields.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    $to = "jahnvi631@gmail.com";

    $subject = "New Contact Form Submission from $name";

    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Event Type: $event_type\n";
    $message .= "Event Date: $event_date\n";
    $message .= "Details:\n$details\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo "Message sent successfully.";
    } else {
        http_response_code(500);
        echo "Could not send email.";
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
?>
