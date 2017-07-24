<?php
	function cp_db_sql_select($arrParms=array(),$strTableName){
		if(!is_array($arrParms)){
			return false;
		}
		$strSql = "select * from ".$strTableName;

		if(count($arrParms) >0 ){
			$strSql .= " where 1=1";
			foreach ($arrParms as $key => $value) {
				$value = htmlspecialchars($value);
				$key = htmlspecialchars($key);
				$strSql .= " and ".$key."='{$value}'";
			}
		}
		$result = cp_db_query_for_all($strSql);
		return $result;
	}
	/*数据分页*/
	function cp_db_sql_page($page,$limit,$strTableName,$flag = false){
		if($strTableName == ""){
			return false;
		}
		if($flag == true){
			$strSql = "select count(*) as count from ".$strTableName;
		}else{
			$begin = $page*$limit-$limit;
			$end = $page*$limit;
			$strSql = "select * from ".$strTableName." limit ".$begin.",$end";	
		}
		$result = cp_db_query_for_list($strSql);
		return $result;
	}
	//更新
	function cp_db_sql_update($arrValue,$arrWhere,$strTableName){
		$strSql = "update ".$strTableName." set ";
		foreach ($arrValue as $key => $value) {	
			$strSql .= $key." = ".$value.","; 
		}
		$strSql = substr($strSql,0,-1);
		$strSql .= " where ";
		foreach ($arrWhere as $key => $value) {
			$strSql .= $key." = ".$value.",";
		}
		$strSql = substr($strSql,0,-1);
		file_put_contents("c:/2.txt",$strSql);
		$result = cp_db_insert_update_sql($strSql);
	}
	//插入
	function cp_db_sql_insert($arrValue,$strTableName){
		$strSql = "insert into ".$strTableName."(";
		foreach ($arrValue as $key => $value) {
			$strSql .=$key.",";
		}
		$strSql = substr($strSql,0,-1);
		$strSql .=") values(";
		foreach ($arrValue as $key => $value) {
			$strSql .=$value.",";
		}
		$strSql = substr($strSql,0,-1);
		$strSql .=")";
		$result = cp_db_insert_update_sql($strSql)1;
	}
?>