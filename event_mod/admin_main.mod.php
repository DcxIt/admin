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
				),
			"Web_controller" => array(
				"menu_name" => "前台控制",
				"menu_list" => array(
					"cp_index" => "首页",
					"cp_instroduce" => "企业简",
					"cp_news" => "企业新闻",
					"product_show" => "产品展示",
					"leav_message" => "留言版"
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
		if(!file_exists($strSrc)){
			$jsonResultBack = json_encode($arrResultBack);
			echo $jsonResultBack;
			return;
		}
		$strHtml = file_get_contents($strSrc);
		echo $strHtml;
	}

	function cp_admin_main_sign_out(){
		$strAdminName = file_get_contents("php://input");
		unset ($_SESSION['admin_name']);
		$result = session_destroy();
		$arrResultBack = array(
			"code" => "error",
			"msg" => "session销毁失败"
		);
		if($result == true){
			$arrResultBack = array(
				"code" => "0000",
				"msg" => "成功退出"
			);
		}
		echo json_encode($arrResultBack);
	}
?>