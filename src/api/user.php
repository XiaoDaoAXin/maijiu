<?php 
// $min = isset($_GET['min'])?$_GET['min']:'';
$name = isset($_REQUEST['name'])?$_REQUEST['name']:'';
$psd = isset($_REQUEST['psd'])?$_REQUEST['psd']:'';
$sort = isset($_REQUEST['sort'])?$_REQUEST['sort']:'';

// echo $name.$sort.$psd;

include 'conn.php';

//判断用户名是否存在
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

//写入用户信息
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

//登录验证
if($sort == 'login'){
    $sql = "SELECT * FROM userinfo WHERE `name`='$name' AND pwd='$psd'";
    $res = $conn->query($sql);
    //查询到数据就是能登陆
    if($res->num_rows) {
        //查到数据：允许登陆
        echo 'yes';
    }else{
        echo 'no';
    }
}





?>