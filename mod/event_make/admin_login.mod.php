<?php
	//include("./db_connect/db_method.mod.php");
	//$arrParms = $_POST[""];
	
	function cp_admin_login_check(){
		$arrParms = file_get_contents("php://input");
		file_put_contents("c:/321.txt",var_export($arrParms,1));

		//$flag = cp_db_login_check($arrParms);
		//file_put_contents("c:/3212.txt",$flag);
		echo "yes";
	}

?>