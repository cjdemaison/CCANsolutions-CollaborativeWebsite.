<?php
require_once "dbconnection.php";

$allowed = ['pdf', 'doc', 'docx'];

if (isset($_FILES['resume']) && isset($_POST['candidate_id'])) {

    $candidate_id = intval($_POST['candidate_id']);

    $fileName = $_FILES['resume']['name'];
    $fileTmp = $_FILES['resume']['tmp_name'];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (!in_array($fileExt, $allowed)) {
        die("Invalid file type. Only PDF, DOC, DOCX allowed.");
    }

    // Create unique filename
    $newName = time() . "_" . basename($fileName);
    $uploadPath = "../uploads/resumes/" . $newName;

    if (move_uploaded_file($fileTmp, $uploadPath)) {

        // Save relative path for browser use
        $dbPath = "uploads/resumes/" . $newName;

        $stmt = $conn->prepare("UPDATE candidates SET resume_path = ? WHERE id = ?");
        $stmt->bind_param("si", $dbPath, $candidate_id);
        $stmt->execute();

        header("Location: ../candidate_profile.php?id=" . $candidate_id);
        exit();

    } else {
        echo "Upload failed.";
    }
}
?>