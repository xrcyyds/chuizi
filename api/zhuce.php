<?php
    // 获取数据
    $user = $_POST['username'];
    $pass = $_POST['password'];
    // print_r ($user);

        // 链接数据库
        $con = mysqli_connect('localhost','root','123123','chuizi');
       
        // 查询数据库中是否存在重复的name语句
        $sqla = "SELECT * FROM `userlist` WHERE `username` = '$user'";
        // 执行语句
        $res1 = mysqli_query($con,$sqla);

        if(!$res1){
            die('数据库链接失败'.mysqli_error($con));
        }

        $row = mysqli_fetch_assoc($res1);

        if($row){
            echo json_encode(array(
                "code" => 0,
                "message" => "注册失败"
              ));
        }else{
              // 把数据添加到数据库中语句
              $sql = "INSERT INTO `userlist` (`username`,`password`) VALUES ('$user','$pass')";
              // 执行语句
                  $res = mysqli_query($con,$sql);
                  if(!$res){
                   die('数据库链接失败'.mysqli_error($con));
               };
    
            echo json_encode(array(
                "code" => 1,
                "message" => "注册成功"
              ),JSON_UNESCAPED_UNICODE);
               
        }



 ?> 