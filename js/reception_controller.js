$(document).ready(
	function(){
		/*reception_banner_change();*/
	}
);
var gPx = 48;
/*function cp_reception_load(){
	var ajaxUrl = "";
}*/

function reception_banner_change(){
	var strLiLength = $(".ul2 li").length;
	for(var i = 0;i<strLiLength+1;i++){
		var display = $(".ul2 li").eq(i).css("display");
		if(display == 'block'){
			$(".ul2 li").eq(i).css("display","none");
				var j = i + 1;
				if(j == strLiLength){
					var j = 0;
				}
				$(".ul2 li").eq(j).css("display","block");
				break;
		}
	}
}
setInterval("reception_banner_change()",2000);

function reception_paoma_light(){
	gPx -= 1;
	var maxPx = -1047;
	if(gPx == maxPx){
		gPx = 48;
	}
	var marginLeft = gPx+"px";
	$(".container6-1-1 ul li").eq(0).css("margin-left",marginLeft);
}
setInterval("reception_paoma_light()",25);