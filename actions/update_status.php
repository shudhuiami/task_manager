<?php

require "../system/config.php";

if(count($_POST)>0){
    $task_id = $_POST['task_id'];
    $complated = 1;

    $update_task_status_query = "UPDATE tasks SET status='$complated' WHERE id = '$task_id'";
    $updated = mysql_query($update_task_status_query);
    if ($updated) {
        $data = array(
            'status' => 2000,
            'data' => 'successfully updated'
        );
    } else {
        $data = array(
            'status' => 5000,
            'data' => 'Failed!'
        );
    }
}

echo json_encode($data, true);