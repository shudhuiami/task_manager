<?php

session_start();
$username = $_SESSION['username'];
$current_date = date("d M, y");

$update = array(
    "username"                    => $username,
    "current_date"             => $current_date
);

echo json_encode($update);