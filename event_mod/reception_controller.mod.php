<?php
/*	function cp_reception_controller_container_html(){
		$arrResultBack = array(
			"code" => "error",
			"msg" => ""
		);
		$strName = file_get_contents("php://input");
		if($strName == ""){
			$arrResultBack['msg'] = '后台接收不到信息';
			$jsonResultBack = json_encode($arrResultBack);
			echo $jsonResultBack;
			return ;
		}
		$strSrc = "./web/".$strName.".html";
		if(!file_exists($strSrc)){
			$arrResultBack['msg'] = '该页面不存在';
			$jsonResultBack = json_encode($arrResultBack);
			echo $jsonResultBack;
			return ;
		}
		$strHtml = file_get_contents($strSrc);
		$arrResultBack = array(
			"code" => "0000",
			"data" => $strHtml
		);
		$jsonResultBack = json_encode($arrResultBack);
		echo $jsonResultBack;
	}*/

	function cp_reception_controller_index_load(){
		$arrResult = cp_db_sql_for_list("t_web_cp_index");
		$a = json_encode($arrResult);

		$arrResultBack = array(
			"code" => "error",
			"msg" => "数据库获取失败"
		);
		if($arrResult == false || count($arrResult) == 0){
			echo json_encode($arrResultBack);
			return;
		}
		$arrResultBack['code'] = '0000';
		$arrResultBack['msg'] = 'success';
		$arrResultBack['data'] = json_encode($arrResult);
		echo json_encode($arrResultBack);
	}
?>