<?php
	//include("./db_connect/db_method.mod.php");
	//$arrParms = $_POST[""];
	
	function cp_admin_login_check(){
		$arrParms = json_decode(file_get_contents("php://input"),true);
		$result = cp_db_sql_select($arrParms,"t_cp_admin_info");
		file_put_contents("c:/321.txt",var_export($arrParms,1));
		file_put_contents("c:/1.txt",var_export($result,1));
		echo "yes";
	}

?>