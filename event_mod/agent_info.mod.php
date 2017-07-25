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
	function cp_agent_info_change(){
		$arrRaw = json_decode(file_get_contents("php://input"),true);
		$arrResultBack = array(
			"code" => "error",
			"msg" => "创建失败"
		);
		if(count($arrRaw) < 1){
			$arrResultBack['msg'] = "接收数据为空";
			$jsonResultBack = json_encode($arrResult);
			echo $jsonResultBack;
			return;
		}		
		$arrValue = $arrRaw['value'];
		$arrWhere = $arrRaw['where'];
		$result = cp_db_sql_update($arrValue,$arrWhere,"t_cp_agent_info");
		if($result == true){
			$arrResultBack['code'] = '0000';
			$arrResultBack['msg'] = '修改成功';
		}else{
			$arrResultBack['msg'] = '修改失败';
		}
		$jsonResultBack = json_encode($arrResultBack);
		echo $jsonResultBack;
	}
	function cp_agent_info_add(){
		$arrData = json_decode(file_get_contents("php://input"),true);
		$arrResultBack = array(
			"code" => "error",
			"msg" => "创建失败"
		);
		if(count($arrData) < 1){
			$arrResultBack['msg'] = "接收数据为空";
			$jsonResultBack = json_encode($arrResult);
			echo $jsonResultBack;
			return;
		}
		$result = cp_db_sql_insert($arrData,"t_cp_agent_info");
		if($result == true){
			$arrResultBack['code'] = '0000';
			$arrResultBack['msg'] = '创建成功';
		}else{
			$arrResultBack['msg'] = '插入数据库失败';
		}
		$jsonResultBack = json_encode($arrResultBack);
		echo $jsonResultBack;
	}
	function cp_agent_info_delete(){
		$strId = file_get_contents("php://input");
		$arrResultBack = array(
			'code' => 'error',
			'msg' => '删除失败'
		);
		if($strId == ""){
			$arrResultBack['msg'] = '接收数据为空';
			$jsonResultBack = json_encode($arrResultBack);
			echo $jsonResultBack;
			return;
		}
		$arrWhere = array(
			'id' => $strId
		);
		
	}
?>