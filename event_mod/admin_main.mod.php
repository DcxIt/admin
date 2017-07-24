<?php
	function cp_admin_main_menu(){
		$arrMenu = array(
			"Guest" => array(
				"menu_name" => "客户管理",
				"menu_list" => array(
					"agent_info" => "客户信息"
					)
				),
			"order" => array(
				"menu_name" => "订单管理",
				"menu_list" => array(
					"agent_order" => "客户订单"
					)
				),
			"DataDetail" => array(
				"menu_name" => "数据统计",
				"menu_list" => array(
					"agent_data_detail" => "数据分析"
					)
				)
		);
		$jsonMenu = json_encode($arrMenu);
		echo $jsonMenu;
	}

	function cp_admin_main_html_contents(){
		$jsonData = file_get_contents("php://input");
		$arrResultBack = array(
			"code" => "error",
			"msg" => "获取该页面失败"
		);
		$strSrc = "./html/".$jsonData.".html";
		file_put_contents("c:/2.txt",$strSrc);
		if(!file_exists($strSrc)){
			$jsonResultBack = json_encode($arrResultBack);
			echo $jsonResultBack;
			return;
		}
		$strHtml = file_get_contents($strSrc);
		file_put_contents("c:/1.txt",$strHtml);
		echo $strHtml;
	}
?>