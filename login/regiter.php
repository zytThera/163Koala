<?php

sleep(2);
mysql_connect('127.0.0.1','root','root');
mysql_query('use sz1903');

$username=$_POST['username'];
$password=$_POST['password'];
// var_dump($_POST);die;
//定义sql语句
$sql="select * from user where username=$username";
$result=mysql_query($sql);
$num=mysql_fetch_assoc($result);
if($num>1){
    //找到数据库中有该username
    $response=['code'=>0,'message'=>'注册失败，该手机号已注册!'];
}else{
    $sq = "insert into user(username,password) values('$username','$password')";
    // echo $sql;die;
    mysql_query($sq);
    $row=mysql_affected_rows();
    if($row>0){
        $response=['code'=>200,'message'=>'注册成功'];
    }else{
        $response=['code'=>-1,'message'=>'注册失败,可能存在其他原因!'];
    }
}

echo json_encode($response);