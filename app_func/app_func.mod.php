<?php
include_once("./db_mod/db_connect.mod.php");
include_once("./db_mod/db_method.mod.php");
function cp_app_inital(){
	session_start();
	//action 表示跳转的页面
	if(!isset($_GET["action"]) && !isset($_GET["mod"]) && !isset($_GET["mod_func"])){
		$output=file_get_contents('./website/index.html'); 
		$output = str_replace("{js}","./website/js",$output);
		$output = str_replace("{css}","./website/css",$output);
		$output = str_replace("{img}","./website/img",$output);
		$output = str_replace("{font-awesome-4.2.0}","./website/font-awesome-4.2.0",$output);
		echo $output;
		return;
	}else if(isset($_GET['action'])){
		$action = $_GET['action'];
		if($action != "login" && $action != "admin_login"){
			if(!isset($_SESSION['admin_name'])){
				$strSrc = "./html/login.html";
				$output=file_get_contents($strSrc); 
				$output = str_replace("{path}","./html/",$output);
				echo $output;
				return;
			}
		}
		$strSrc = "./html/".$action.".html";
		if(!file_exists($strSrc)){
			exit("该页面不存在");
		}
		$output = file_get_contents($strSrc); 
		$output = str_replace("{path}","./html/",$output);
		echo $output;
		return;	
/*		$arrAction = array("login","admin","agent_info");
		foreach ($arrAction as $key => $value){
			if($value == $action){
				$strSrc = "./html/".$action.".html";
				$output = file_get_contents($strSrc); 
				$output = str_replace("{path}","./html/",$output);
				echo $output;
				return;				
			}
		}*/		
	} 
	//mod 表示业务逻辑的判断
	if(isset($_GET['mod'])){
		$mod = $_GET['mod'];
		$arrMod = array("admin_login","agent_info","agent_order");
		$flag = false;
		foreach ($arrMod as $key => $value) {
			if($value == $mod ){
				$flag = true;
				break;
			}
		}
		if($flag == false){
			exit("找不到该mod");
		}
		if(!isset($_GET['mod_func'])){
			exit("您没有传递mod的方法");
		}
		$strSrcMod = "./event_mod/".$mod.".mod.php";
		if(!file_exists($strSrcMod)){
			exit("找不到该".$mod.".mod.php");
		}
		include_once($strSrcMod); 
		$funcName = "cp_".$mod."_".$_GET['mod_func'];
		call_user_func($funcName);	
		return;		
	}
}




?>