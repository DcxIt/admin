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

	function cp_reception_controller_load(){
		$arrResultBack = array(
			"code" => "error",
			"msg" => "数据库获取失败"
		);
		$strPararms = file_get_contents("php://input");
		if($strPararms == ""){
			$arrResultBack['msg']='后台接收参数为空';
			echo json_encode($arrResultBack);
			return;
		}
		$strTable = "t_web_cp_".$strPararms; 
		$arrResult = cp_db_sql_for_list($strTable);
		if($arrResult == false || count($arrResult) == 0){
			echo json_encode($arrResultBack);
			return;
		}
		common_debug($arrResult,1);
		$arrResult = arr_utf8($arrResult);
		$arrResultBack['code'] = '0000';
		$arrResultBack['msg'] = 'success';
		$arrResultBack['data'] = $arrResult;
		$jsonResult = json_encode($arrResultBack);
		echo $jsonResult;
	}
?>