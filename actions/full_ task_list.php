<?php
require "../system/config.php";

session_start();
$user_id = $_SESSION['id'];
$task_query = mysql_query("SELECT * FROM tasks WHERE user_id = '$user_id' ORDER BY id DESC");

$tasks = array();
while ($row = mysql_fetch_array($task_query)) {
//    $task_status = $row['status'];
    $task = array(
        "id"                    => $row['id'],
        "user_id"             => $row['user_id'],
        "task_title"                  => $row['task_title'],
        "schedule_date"            => $row['schedule_date'],
        "create_date"          => $row['create_date'],
        "status"            => $row['status']
    );
    $tasks[] = $task;
}

echo json_encode($tasks);
?>