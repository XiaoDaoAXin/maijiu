<?php
    include 'connect.php';
    //添加购物车
    //传入id,用户cid，颜色，数量
    $good_id = isset($_POST['good_id']) ? $_POST['good_id'] : '';
    $color = isset($_POST['color']) ? $_POST['color'] : '';
    $num = isset($_POST['num']) ? $_POST['num'] : '';
    $cid = isset($_POST['cid']) ? $_POST['cid'] : '';
    //查询购物车是否含有该商品
    $sql = "SELECT * FROM cart WHERE good_id = '$good_id' AND color = '$color' and cid='$cid'";
    $res = $conn->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);
    if($row){
        //购物车已经存在，则改变原有数量
        $sql2 = "UPDATE cart SET num=num+$num*1 WHERE good_id='$good_id' AND color = '$color' and cid='$cid'";
        $res2 = $conn->query($sql2);
    }else{
        //不存在，插入一条新的商品信息
        $sql2 = "INSERT INTO cart(good_id,name,url,nowprice,has,num,color,cid) SELECT good_id,name,url1,nowprice,has,$num,'$color',$cid from goodslist where good_id='$good_id'";
        $res2 = $conn->query($sql2);
    }
    
    if($res2){
        echo 0;
    }else{
        echo 1;
    }
?>