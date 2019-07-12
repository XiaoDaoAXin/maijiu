<?php
 ini_set("error_reporting","E_ALL & ~E_NOTICE");
    //添加购物车
    //传入id,用户cid，颜色，数量
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $num = isset($_POST['num']) ? $_POST['num'] : '';
    $src = isset($_POST['src']) ? $_POST['src'] : '';
    $price = isset($_POST['price']) ? $_POST['price'] : '';
    $kucun = isset($_POST['kucun']) ? $_POST['kucun'] : '';
    // $cid = isset($_POST['cid']) ? $_POST['cid'] : '';
    // echo $gid.$title.$num.$src.$price.$kucun;
    //查询购物车是否含有该商品
    include 'conn.php';
     //查询购物车是否含有该商品
     $sql = "SELECT * FROM `car` WHERE gid=$gid;";
     $res = $conn->query($sql);
     $content = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($content);
    if($content){
        //购物车已经存在，则改变原有数量
        $sql1 = "UPDATE car SET num =num + $num  WHERE gid=$gid;";
        $res1 = $conn->query($sql1);
    }else{
        //不存在，插入一条新的商品信息
        $sql2 = "INSERT INTO car(gid,title,src,price,num,kucun) values($gid,'$title','$src',$price,$num,$kucun);";
        $res2 = $conn->query($sql2);
    }
    
    if($res1){
        echo '添加数量';
    }else if($res2){
        echo '添加商品成功';
    }
?>