<?php
	function cp_agent_info_list(){
		$arrRaw = json_decode(file_get_contents("php://input"),true);
		$page = $arrRaw['page'];
		$limit = $arrRaw['limit'];
		$arrResult = cp_db_sql_page($page,$limit,"t_cp_agent_info");
		if(count($arrResult) == 0){
			$arrBackResult = array(
				"code" => "error",
				"msg" => "数据库读取数据错误"
			);
		}else if(count($arrResult) > 0){
			$arrBackResult = array(
				"code" => "0000",
				"backData" => $arrResult 
			);
		}
		echo json_encode($arrBackResult);
	}
	function cp_agent_info_count_all(){
		$arrResult = cp_db_sql_page("","","t_cp_agent_info",true);
		file_put_contents("c:/5.txt",var_export($arrResult,1));
		if(count($arrResult) > 0 && is_array($arrResult)){
			$arrBackResult = array(
				"code" => "0000",
				"backData" => $arrResult['0']['count']
			);
		}else{
			$arrBackResult = array(
				"code" => "error",
				"msg" => "从数据库获取数据错误,检查数据库连接"
			);			
		}
		echo json_encode($arrBackResult);
	}

?>