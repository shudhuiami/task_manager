<?php
require "../system/config.php";

if(count($_POST)>0){
    $task_id=$_POST['task_id'];

    //Insert query
    $delete_task_query = "DELETE FROM tasks WHERE id='$task_id'";
    $task_deleted=mysql_query($delete_task_query);
    if ($task_deleted) {
        $data = array(
            'status' => 2000,
            'data' => 'successfully deleted',
        );
    } else {
        $data = array(
            'status' => 5000,
            'data' => 'Failed!'
        );
    }
}
echo json_encode($data, true);
?>