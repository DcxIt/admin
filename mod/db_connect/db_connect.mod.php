<?php
	header("Content-type: text/html; charset=utf-8");
	$strLink = mysql_connect("127.0.0.1","root","123456");
	mysql_query("set names utf-8",$strLink);
	if(!$strLink){
		echo "链接失败";
		return;
	}
	mysql_select_db("db_company",$strLink);
/*	$arr = json_decode(file_get_contents("php://input"),true);
	if(count($arr) > 0){
		$sqlUpdate = "update chat set is_new='1' , recev='{$arr['recev']}' , content='{$arr['content']}' where id='1'";
		mysql_query($sqlUpdate,$strLink);
	}*/
?>