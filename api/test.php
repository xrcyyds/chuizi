<?php
    $con = mysqli_connect('localhost','root','123123','chuizi');

    $id = $_POST['id'];
    $title = $_POST['title'];
    $img = $_POST['img'];
    $title1 = $_POST["title1"];
    $price = $_POST["price"];
    $price2 = $_POST["price2"];
    $yellow = $_POST["yellow"];
  

    // print_r($id)；

    $sqla = "SELECT * FROM `goods` WHERE `title` = '$title' AND `img` = '$img' AND `title1` = '$title1' AND `price` = '$price' ";
    // 执行语句
    $res1 = mysqli_query($con,$sqla);

   
  
    if (!$res1) {
        printf("Error: %s\n", mysqli_error($con));
        exit();
    }else{
        $sql = "INSERT INTO `goods` (`id`,`title`,`img`,`title1`,`price`,`price2`,`yellow`) VALUES ('$id','$title','$img','$title1','$price','$price2','$yellow')";
  
        $res = mysqli_query($con,$sql);

        if (!$res) {
        
                die('数据库链接失败'.mysqli_error($con));
            }
    }
    
  
 
  
    

?>