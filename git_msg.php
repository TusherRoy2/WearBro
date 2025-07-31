<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "jahirshuvo369@gmail.com";
    $subject = "Get in Touch $name";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message: $message\n";

    $headers = "From: noreply@yourdomain.com";

    if (mail($to, $subject, $body, $headers)) {
        echo "<div style='text-align:center; margin-top:50px;'><h2>Thank you for your Message!</h2><a href='index.php'>Back to site</a></div>";
    } else {
        echo "<div style='text-align:center; margin-top:50px;'><h2>There was a problem sending your Message.</h2><a href='index.php'>Back to site</a></div>";
    }
}
?>
