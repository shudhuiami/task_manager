<?php
if(count($_POST)>0){
    session_start();
    session_destroy();
    $data = array(
        'status' => 2000,
        'data' => 'logout'
    );
}
echo json_encode($data, true);
?>