<?php
require "../system/config.php";

if(count($_POST)>0){
    session_start();
    $user_id = $_SESSION['id'];
    $task_title=$_POST['task_title'];
    $schedule_date=$_POST['schedule_date'];
    $status = 0;
    $create_date = date("d M, y");

    //Insert query
    $add_task_query = "insert into tasks ( user_id, task_title, schedule_date, create_date, status)values ('$user_id','$task_title', '$schedule_date', '$create_date' ,'$status')";
    $task_added=mysql_query($add_task_query);
    if ($task_added) {
        $data = array(
            'status' => 2000,
            'data' => 'successfully registered',
            'create_date' => $create_date
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