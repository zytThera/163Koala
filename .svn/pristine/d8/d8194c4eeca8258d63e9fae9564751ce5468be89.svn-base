<?php
sleep(2);
mysql_connect('127.0.0.1','root','root');
mysql_query('use sz1903');

$username=$_POST['username'];
$password=$_POST['password'];

//定义sql语句
$sql = "select * from user where username='$username' and password='$password'";
$result=mysql_query($sql);
$row=mysql_fetch_assoc($result);
if($row){
    //和数据库账号密码匹配成功
    $response=['code'=>200,'message'=>'登录成功'];
}else{
    $response=['code'=>-1,'message'=>'手机号或密码错误'];
}
//输出json格式
echo json_encode($response) ; 