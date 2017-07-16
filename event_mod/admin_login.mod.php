<?php
	//登陆检测
	function cp_admin_login_check(){
		$arrParms = json_decode(file_get_contents("php://input"),true);
		$arrResult = cp_db_sql_select($arrParms,"t_cp_admin_info");
		if(count($arrResult) == 0){
			$arrResultBack = array(
				"code" => "10000",
				"msg" => "登陆失败"
			);			
		}else{
			$_SESSION['admin_name'] = $arrParms["admin_name"];
			$arrResultBack = array(
				"code" => "0000",
				"msg" => "登陆成功"
			);
		}
		$jsonResultBack = json_encode($arrResultBack);
		echo $jsonResultBack;
	}

?>