<?php
require "../system/config.php";

$username = $_POST['username'];
$password = $_POST['password'];
$user_query = "SELECT * FROM user WHERE username='" . $username . "' AND password='" . $password . "'";
$user_result = mysql_query($user_query);
$numrows=mysql_num_rows($user_result);
if($numrows!=0)
{
    while($row=mysql_fetch_assoc($user_result))
    {
        $dbid=$row['id'];
        $dbusername=$row['username'];
        $dbemail=$row['email'];
        $dbpassword=$row['password'];

    }

    if($username == $dbusername && $password == $dbpassword)
    {
        session_start();
        $_SESSION['id']=$dbid;
        $_SESSION['username']=$username;
        $_SESSION['email']=$dbemail;
        $data = array(
            'status' => 2000,
            'data' => "logged in"
        );
    }
} else {
    $data = array(
        'status' => 5000,
        'data' => "failed!!"
    );
}
echo json_encode($data, true);
?>

