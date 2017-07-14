<?php
	header("Content-type: text/html; charset=utf-8");
	function cp_db_connect_get(){
		$strLink = new mysqli('127.0.0.1','root','123456','test');
		if(!$strLink){
			exit("链接失败");
		}
		return $strLink;		
	}

	function cp_db_query_for_list($strSql){
		$connect = cp_db_connect_get();
		$result = $connect -> query($strSql);
		$result = $result -> fetch_all();
		return $result;
	}
	//mysql_select_db("test",$strLink);
/*	$arr = json_decode(file_get_contents("php://input"),true);
	if(count($arr) > 0){
		$sqlUpdate = "update chat set is_new='1' , recev='{$arr['recev']}' , content='{$arr['content']}' where id='1'";
		mysql_query($sqlUpdate,$strLink);
	}*/
?>