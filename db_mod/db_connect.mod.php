<?php
	header("Content-type: text/html; charset=utf-8");
	function cp_db_connect_get(){
		$strLink = new mysqli('bdm251094557.my3w.com','bdm251094557','zhangzhen1314','bdm251094557_db');
		if(!$strLink){
			exit("链接失败");
		}
		return $strLink;		
	}

	function cp_db_query_for_all($strSql){
		$connect = cp_db_connect_get();
		$result = $connect -> query($strSql);
		$result = $result -> fetch_row();		
		return $result;
	}

	function cp_db_query_for_list($strSql){
		$connect = cp_db_connect_get();
		$result = $connect -> query($strSql);
		$arrData=array();
		$arrResult = array();

		while($row=mysqli_fetch_array($result)){
		    $arrData[]=$row;
		}
		if(count($arrData) > 0 && is_array($arrData)){
			foreach ($arrData as $key => $value) {
				foreach ($value as $secKey => $secValue) {
					if(!is_numeric($secKey)){
						$arrResult[$key][$secKey] = $secValue;
					}
				}
			}
		}
		return $arrResult;
	}
	function cp_db_insert_update_sql($strSql){
		$connect = cp_db_connect_get();
		$result = $connect -> query($strSql);
		return $result;
	} 
?>