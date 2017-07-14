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
				$strSql .= " and ".$key."=".$value;
			}
		}
		
		$result = cp_db_query_for_list($strSql);
		return $result;
	}
?>