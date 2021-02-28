<?php
    $goods_id = $_POST['goods_id'];
    $username = $_POST['username'];
    $goods_num = $_POST['goods_num'];

    $con = mysqli_connect('localhost','root','123123','chuizi');


    $sql = "SELECT * FROM   `car` WHERE `username` = '$username' AND  `goods_id` = '$goods_id'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接错误'.mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($res);

    // 如果$row不存在说明在购物车表没有找到这条数据
    if(!$row){
        // 添加这条数据到购物车表
        $addSql = "INSERT INTO `car` VALUES (null, '$username', '$goods_id', '$goods_num')";

        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{
        // 如果存在该条数据，则把数量加一
        $goods_num = $goods_num+$row['goods_num'];
        // 修改购物车表中该数据的数量
        $updat = "UPDATE `car` SET `goods_num` = '$goods_num' WHERE `username` = '$username' AND `goods_id` = '$goods_id'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }  
?>