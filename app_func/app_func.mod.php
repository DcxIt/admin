<?php
include_once("./db_mod/db_connect.mod.php");
include_once("./db_mod/db_method.mod.php");
include_once("./common/common.php");
function cp_app_inital(){

	session_start();
	//action 表示跳转的页面
	if(!isset($_GET["action"]) && !isset($_GET["mod"]) && !isset($_GET["mod_func"])){
		$output=file_get_contents('./web/index.html'); 
		$output = str_replace("{newPathJs}","./js",$output);
		$output = str_replace("{newPathCss}","./css",$output);
		$output = str_replace("{newPathImg}","./img",$output);
		echo $output;
		return;
	}else if(isset($_GET['action'])){
		$action = $_GET['action'];
		if($action != "login"){
			if(!isset($_SESSION['admin_name'])){
				$strSrc = "./html/login.html";
				$output=file_get_contents($strSrc); 
				$output = str_replace("{path}","./html/",$output);
				echo $output;
				return;
			}
		}else if($action == "login"){
				$strSrc = "./html/login.html";
				$output=file_get_contents($strSrc); 
				$output = str_replace("{path}","./html/",$output);
				echo $output;
				return;			
		}
		$strSrc = "./html/".$action.".html";
		if(!file_exists($strSrc)){
			exit("该页面不存在");
		}
		$output = file_get_contents($strSrc); 
		$output = str_replace("{path}","./",$output);
		$output = str_replace("{admin_name}",$_SESSION['admin_name'],$output);
		echo $output;
		return;		
	} 
	//mod 表示业务逻辑的判断
	if(isset($_GET['mod'])){
		$mod = $_GET['mod'];
		if(!isset($_GET['mod_func'])){
			exit("您没有传递mod的方法");
		}
		$strSrcMod = "./event_mod/".$mod.".mod.php";
		if(!file_exists($strSrcMod)){
			exit("找不到该".$mod.".mod.php");
		}
		include_once($strSrcMod); 
		$funcName = "cp_".$mod."_".$_GET['mod_func'];
		if (function_exists($funcName)) {
 			call_user_func($funcName);
		}else{
			exit("找不到该".$funcName."方法");
		}
	
		
	}
}




?>