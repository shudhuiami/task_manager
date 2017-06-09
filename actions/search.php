<?php
require "../system/config.php";

if(count($_POST) > 0){
    session_start();
    $user_id = $_SESSION['id'];
    $task_date = $_POST['task_date'];

    $search_query =mysql_query("SELECT * FROM tasks WHERE schedule_date='$task_date' AND user_id= '$user_id'");

    $tasks = array();
    while ($row = mysql_fetch_array($search_query)) {
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
}