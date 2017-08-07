<?php
	function common_debug($xData,$name='1'){
		if(is_array($xData)){
			file_put_contents("c:/".$name.".txt",var_export($xData,1));
		}else{
			file_put_contents("c:/".$name.".txt",$xData);
		}
	}
	function arr_utf8($arr){
		$in_charset="gbk";
		$out_charset="utf-8";
	    return eval('return '.iconv($in_charset,$out_charset,var_export($arr,true).';'));    
	} 
?>