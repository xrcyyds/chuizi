<?php
// 链接数据库
$con = mysqli_connect('localhost','root','123123','chuizi');

  $id = $_GET['id'];

  $sql = "SELECT * FROM `goods` WHERE `id`='$id'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

//   print_r($row);

  echo json_encode(array(
    "code" => 1,
    "message" => "获取商品信息成功",
    "detail" => $row
  ))

?>