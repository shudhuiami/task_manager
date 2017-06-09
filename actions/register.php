<?php
require "../system/config.php";

if(count($_POST)>0){
    $username=$_POST['username'];
    $email=$_POST['email'];
    $password=$_POST['password'];

    //Insert query
    $register_query = "insert into user (username, email, password) values ('$username','$email', '$password')";
    $registered=mysql_query($register_query);
    if ($registered) {
        $data = array(
            'status' => 2000,
            'data' => 'successfully registered'
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