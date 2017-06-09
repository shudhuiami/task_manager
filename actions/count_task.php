<?php
require "../system/config.php";

session_start();
$user_id = $_SESSION['id'];

$complete_task = mysql_query("SELECT * FROM tasks WHERE status = 1 AND user_id ='$user_id'");
$completed = mysql_num_rows($complete_task);

$total_task = mysql_query("SELECT * FROM tasks WHERE user_id ='$user_id'");
$tasks = mysql_num_rows($total_task);

$task_num_info = array(
    "total_task"                    => $tasks,
    "Completed_task"             => $completed
);

echo json_encode($task_num_info);

?>