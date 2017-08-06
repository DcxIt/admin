<?php
	function common_debug($xData,$name='1'){
		if(is_array($xData)){
			file_put_contents("c:/".$name.".txt",var_export($xData,1));
		}else{
			file_put_contents("c:/".$name.".txt",$xData);
		}
	}
?>