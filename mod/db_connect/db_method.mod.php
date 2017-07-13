<?php
	include_once("db_connect.mod.php");
	function cp_db_login_check($arrParms){
		if(!is_array($arrParms)){
			return false;
		}
		if(!isset($arrParms['admin_name']) || !isset($arrParms['admin_password'])){
			return false;
		}
		$strAdminName = htmlspecialchars($arrParms['admin_name']);
		$strPassWord = htmlspecialchars($arrParms['admin_password']);
		$strSql = "select * from t_copmpany_admin_info where admin_name='{$strAdminName}' and admin_password='{$strPassWord}'";
		$arrResult = mysql_query($strSql);
		if($arrRow = mysql_fetch_assoc($arrResult)){
			return true;
		}else{
			return false;
		}
	}
?>