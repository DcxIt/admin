<?php

function cp_app_inital(){
	if(!isset($_GET["action"])){
		$output=file_get_contents('./website/index.html'); 
		$output = str_replace("{js}","./website/js",$output);
		$output = str_replace("{css}","./website/css",$output);
		$output = str_replace("{img}","./website/img",$output);
		$output = str_replace("{font-awesome-4.2.0}","./website/font-awesome-4.2.0",$output);
		echo $output;
		return;
	} 
	$action = $_GET['action'];
/*	$arr_action = array(
		"admin_login"
	);*/
	if($action == 'login' ){
		$output=file_get_contents('./html/login.html'); 
		$output = str_replace("{assets}","./html/assets",$output);
		echo $output;
		return;		
	}
	if($action == "admin_login"){
		
		if(file_exists("./mod/event_make/admin_login.mod.php")){
			file_put_contents("c:/123456.txt","asdasdasdasd");
		}
		include_once("./mod/event_make/admin_login.mod.php"); 
		$funcName = "cp_admin_login_check";
		call_user_func($funcName);	
		return;	
	}
}




?>