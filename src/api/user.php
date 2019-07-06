<?php 
// $min = isset($_GET['min'])?$_GET['min']:'';
$name = isset($_REQUEST['name'])?$_REQUEST['name']:'';
$psd = isset($_REQUEST['psd'])?$_REQUEST['psd']:'';
$sort = isset($_REQUEST['sort'])?$_REQUEST['sort']:'';

// echo $name.$sort.$psd;

include 'conn.php';

 if($sort == 'ifhas'){
    $sql = "SELECT * FROM userinfo WHERE NAME = '$name'";
    $res = $conn->query($sql);
    if($res->num_rows) {
        //真：存在，不给注册
        echo 'no';
    }else {
        echo 'yes';
    }
 }
    // echo json_encode($content,JSON_UNESCAPED_UNICODE);


if($sort == 'reg'){
    $sql = "INSERT INTO userinfo (NAME,pwd) VALUES('$name','$psd');";
    $res = $conn->query($sql);
    if($res) {
        //真：插入成功
        echo 'yes';
    }else {
        echo 'no';
    }
}





?>