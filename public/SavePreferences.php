<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include("db.php");

//--- Get the raw POST data
if (!isset($_POST['userId']) || !isset($_POST['categories'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId or categories in POST data"]);
    exit();
}

$userId = $_POST['userId'];
$categories = json_decode($_POST['categories'], true);

//--- Validate the input
if ($categories === null || !is_array($categories)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid categories format. Expected JSON array."]);
    exit();
}

//check if user aleardy in the database to update the preferences(json formate must save) instead of inserting a new row

$sqlCheckUser = "SELECT * FROM preferencesuser WHERE uid = ?";
//--- Prepare the statement to prevent SQL injection
$stmt = mysqli_prepare($con, $sqlCheckUser);
mysqli_stmt_bind_param($stmt, "s", $userId);
mysqli_stmt_execute($stmt);
$resCheckuser = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($resCheckuser) > 0) {
    //--- prepare the updtate statement to prevent SQL injection
    $sqlUpdatePreferences = "UPDATE preferencesuser SET preferences = ? WHERE uid = ?";
    $stmtUpdate = mysqli_prepare($con, $sqlUpdatePreferences);
    mysqli_stmt_bind_param($stmtUpdate, "ss", json_encode($categories), $userId);
    if (mysqli_stmt_execute($stmtUpdate)) {
        echo json_encode(["message" => "Preferences updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database update failed: " . mysqli_error($con)]);
    }
    mysqli_stmt_close($stmtUpdate);
} else { //--- Save preferences to the database
    //--- prepare the insert statement to prevent SQL injection
    $sqlInsertPreferences = "INSERT INTO preferencesuser (uid, preferences) VALUES (?, ?)";
    $stmtInsert = mysqli_prepare($con, $sqlInsertPreferences);
    mysqli_stmt_bind_param($stmtInsert, "ss", $userId, json_encode($categories));
    if (mysqli_stmt_execute($stmtInsert)) {
        echo json_encode(["message" => "Preferences saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database insert failed: " . mysqli_error($con)]);
    }
    mysqli_stmt_close($stmtInsert);
}

mysqli_stmt_close($stmt);


mysqli_close($con);
