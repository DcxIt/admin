<?php
	header("Content-type: text/html; charset=utf-8");
	function cp_db_connect_get(){
		$strLink = new mysqli('127.0.0.1','root','123456','test');
		if(!$strLink){
			exit("链接失败");
		}
		return $strLink;		
	}

	function cp_db_query_for_all($strSql){
		$connect = cp_db_connect_get();
		$result = $connect -> query($strSql);
		$result = $result -> fetch_all();
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
		et_file_write("c:/1.txt",var_result($result,1));
	} 
?>