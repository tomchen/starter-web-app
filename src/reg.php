<?php

if (!(isset($_POST['name']) && !empty($_POST['name']) &&
	isset($_POST['company']) && !empty($_POST['company']) &&
	isset($_POST['tel']) && !empty($_POST['tel']) &&
	isset($_POST['email']) && !empty($_POST['email']))) {
	die();
}

try {

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "tourtech";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8mb4");

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	// prepare and bind
	$stmt = $conn->prepare("INSERT INTO inscription (name, company, profession, tel, email) VALUES (?, ?, ?, ?, ?)");
	$stmt->bind_param("sssss", $name, $company, $profession, $tel, $email);

	// set parameters and execute
	$name = $_POST['name'];
	$company = $_POST['company'];
	$profession = $_POST['profession'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	if ($stmt->execute()) {
		echo "Votre inscription a bien été enregistrée. Merci et à bientôt !";
	} else {
		echo "Vous êtes déjà inscrit (une même adresse e-mail existe).";
	}

} catch (Exception $e) {
	die('Error : ' . $e->getMessage());
}

$stmt->close();
$conn->close();

?>
