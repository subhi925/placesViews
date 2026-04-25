<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//get the user preferences from the database
include("db.php");
if (!isset($_POST['userId'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId in POST data"]);
    exit();
}
$userId = $_POST['userId'];
$sqlToGetPerferences = "SELECT 	preferences FROM preferencesuser WHERE uid = ?";
//--- Prepare the statement to prevent SQL injection // Debugging line to check if userId is received correctly
if($stmt = $con->prepare($sqlToGetPerferences)){
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row['preferences']);
    } else {
        echo json_encode(["message" => "No preferences found for this user"]);
    }
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database query failed: " . $con->error]);
}
$con->close();

?>