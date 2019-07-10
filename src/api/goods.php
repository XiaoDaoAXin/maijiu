<?php

// $min = isset($_GET['min'])?$_GET['min']:'';
 $gid=isset($_REQUEST['gid'])? $_REQUEST['gid']:'1';
//  echo $gid;
include 'conn.php';

$sql = "SELECT * FROM baijiu WHERE gid = '$gid';";

$res = $conn->query($sql);

$content = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($res);

echo json_encode($content,JSON_UNESCAPED_UNICODE);





?>