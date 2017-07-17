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
		file_put_contents("c:/1.txt",$strSql);
		$result = cp_db_query_for_list($strSql);
		file_put_contents("c:/2.txt",var_export($result,1));
		return $result;

	}
?>