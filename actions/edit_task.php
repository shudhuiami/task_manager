<?php
require "../system/config.php";

if(count($_POST)>0){
    session_start();
    $task_id = $_POST['task_id'];
    $task_title=$_POST['task_title'];
    $schedule_date=$_POST['schedule_date'];
    $status = 0;
    $create_date = date("d M, y");

    //Insert query
    $edit_task_query = "UPDATE tasks SET  task_title='$task_title', schedule_date='$schedule_date' WHERE id='$task_id'";
    $task_edited=mysql_query($edit_task_query);
    if ($task_edited) {
        $data = array(
            'status' => 2000,
            'data' => 'successfully edited',
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