$(document).ready(
	function(){
		reception_banner_load();
	}
);

function reception_banner_load(){
	var ajaxUrl = "?mod=reception_controller&mod_func=index_load";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:"",
		dateType:"text",
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == 'error'){
				alert(objData['msg']);
				return;
			}
			var jsonBanner = objData['data'];
			var objB = JSON.parse(jsonBanner);
			var objBannerList = objB[0]["cp_banner"].split(",");
			for(str in objBannerList){
				var src = "./"+objBannerList[str];
				var li = "<li style='background-image:url("+src+");display:none'></li>";
				$(li).appendTo($(".ul2"));
			}
			$(".ul2 li").eq(0).css("display","block");
		}
	})
}

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
var timer = setInterval("reception_banner_change()",5000);

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
function reception_paoma_light_left(){
	gPx -= 239;
	var maxPx = -1047;
	if(gPx < maxPx){
		gPx = 48;
	}
	var marginLeft = gPx+"px";
	$(".container6-1-1 ul li").eq(0).css("margin-left",marginLeft);
}
function reception_paoma_light_right(){
	gPx += 239;
	var maxPx = 48;
	if(gPx > maxPx){
		gPx = 48;
	}
	var marginLeft = gPx+"px";
	$(".container6-1-1 ul li").eq(0).css("margin-left",marginLeft);
}




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
    	if(strHtml == 'index'){
    		setInterval("reception_banner_change()",5000);
    	}else{
    		clearInterval(timer);
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

//点击新闻跳转到相应的内容

function reception_news_html_change(strHtml,newsId){
	reception_html_change(strHtml);

}
/***************************instroduce.js内容*/


/***************************product.js内容*/


/***************************news.js内容*/
function reception_news_show(newsId){

}

/***************************link.js内容*/