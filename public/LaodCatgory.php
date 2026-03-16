<?php
include("db.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$sql ="SELECT * FROM categories";

$result = mysqli_query($con, $sql);
$data = array();
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Database query failed: " . mysqli_error($con)]);
    exit();
}
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);

?>