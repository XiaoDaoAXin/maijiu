<?php
//接口功能：帮前端查询第几页的数据
$page = isset($_GET['page']) ? $_GET['page'] : '';//页数，哪一页
$num = isset($_GET['number']) ? $_GET['number'] : '';//一页数据有10条
$paixu = isset($_GET['paixu']) ? $_GET['paixu'] : '';

// echo $paixu;
include 'conn.php';
$index = ($page - 1) * $num;

if($paixu==''){
    $sql = "SELECT * FROM baijiu ORDER BY gid LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}

if($paixu=='zan'){
    $sql = "SELECT * FROM baijiu ORDER BY zan LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}

if($paixu=='xl'){
    $sql = "SELECT * FROM baijiu ORDER BY xl LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}

if($paixu=='price'){
    $sql = "SELECT * FROM baijiu ORDER BY price LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}

if($paixu=='dis'){
    $sql = "SELECT * FROM baijiu ORDER BY dis LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}
if($paixu=='time'){
    $sql = "SELECT * FROM baijiu ORDER BY time LIMIT $index,$num;";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
}






?>