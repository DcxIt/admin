$(document).ready(
	function(){
		/*reception_banner_change();*/
	}
);
var gPx = 48;

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
setInterval("reception_banner_change()",5000);

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


function reception_html_change(strHtml){
	if(strHtml == ""){
		alert("无法获取到strHtml参数");
		return;
	}
	var strSrc = "./web/"+strHtml+".html";
    $.get(strSrc,function(data,status){
    	if(status != "success"){
    		alert("跳转页面失败");
    		return;
    	}
		$("#all_contents").html("");
		$(data).appendTo($("#all_contents"));    	
    });	
}


function reception_banner_next(){
	var strLiLength = $(".ul2 li").length;
	for(var i = 0;i<strLiLength+1;i++){
		var display = $(".ul2 li").eq(i).css("display");
		if(display == 'block'){
			$(".ul2 li").eq(i).css("display","none");
				var j = i + 1;
				if(j == 4){
					var j = 0;
				}
				$(".ul2 li").eq(j).css("display","block");
				break;
		}
	}
}

function reception_banner_prev(){
	var strLiLength = $(".ul2 li").length;
	for(var i = 0;i<strLiLength+1;i++){
		var display = $(".ul2 li").eq(i).css("display");
		if(display == 'block'){
			$(".ul2 li").eq(i).css("display","none");
				var j = i - 1;
				if(j == -1){
					var j = 3;
				}
				$(".ul2 li").eq(j).css("display","block");
				break;
		}
	}	
}