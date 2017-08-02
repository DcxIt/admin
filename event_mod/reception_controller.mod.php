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
?>