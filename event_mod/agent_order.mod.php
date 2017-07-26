<?php
	function cp_agent_order_list(){
		$arrRaw = json_decode(file_get_contents("php://input"),true);
		$page = $arrRaw['page'];
		$limit = $arrRaw['limit'];
		$arrResult = cp_db_sql_page($page,$limit,"t_cp_agent_order");
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
	function cp_agent_order_count_all(){
		$arrResult = cp_db_sql_page("","","t_cp_agent_order",true);
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
	function cp_agent_order_add(){
		$arrData = json_decode(file_get_contents("php://input"),true);
		$arrBackResult = array(
			"code" => "error",
			"msg" => "创建失败"
		);
		if(count($arrData) < 1){
			$arrBackResult['msg'] = '接收数据为空';
			$jsonBackResult = json_encode($arrBackResult);
			echo $jsonBackResult;
			return;
		}
		$result = cp_db_sql_insert($arrValue,"t_cp_agent_order");
		if($result == true){
			$arrBackResult['code'] = '0000';
			$arrBackResult['msg'] = '订单创建成功';
		}else{
			$arrBackResult['msg'] = '订单入库失败';
		}
		echo json_encode($arrBackResult);
	}
	function cp_agent_order_delete(){
		$arrData = json_decode(file_get_contents("php://input"),true);
		$arrBackResult = array(
			"code" => "error",
			"msg" => "删除失败"
		);
		if(count($arrData) < 1){
			$arrBackResult['msg'] = '接收数据为空';
			$jsonBackResult = json_encode($arrBackResult);
			echo $jsonBackResult;
			return;
		}
		$result = cp_db_sql_delete($arrData,"t_cp_agent_order");
		if($result == true){
			$arrBackResult['code'] = '0000';
			$arrBackResult['msg'] = '订单删除成功';
		}else{
			$arrBackResult['msg'] = '删除失败';
		}
		echo json_encode($arrBackResult);		
	}
	function cp_agent_order_change(){
		$arrData = json_decode(file_get_contents("php://input"),true);
		$arrBackResult = array(
			"code" => "error",
			"msg" => "修改失败"
		);
		if(!isset($arrData['value']) || !isset($arrData['where'])){
			$arrBackResult['msg'] = "后台接收数据为空";
			echo json_encode($arrBackResult);
			return;
		}
		$arrValue = $arrData['value'];
		$arrWhere = $arrData['where'];
		$result = cp_db_sql_update($arrValue,$arrWhere,'t_cp_agent_order');
		if($result == true){
			$arrBackResult['code'] = '0000';
			$arrBackResult['msg'] = '修改成功';
		}else{
			$arrBackResult['msg'] = '修改失败';
		}
		echo json_encode($arrBackResult);
	}
?>