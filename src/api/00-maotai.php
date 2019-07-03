<?php
// $min = isset($_GET['min'])?$_GET['min']:'';
// $max = isset($_GET['max'])?$_GET['max']:'';

include 'conn.php';
$sql = "SELECT * FROM maotai;";

$res = $conn->query($sql);

$content = $res->fetch_all(MYSQLI_ASSOC);
// $content = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($content,JSON_UNESCAPED_UNICODE);


?>