$(document).ready(
	function(){
		reception_banner_load();
		reception_news_load();
		reception_product_load();
	}
);
var Gnews = "";
var Ginstroduce = "";
var Gproduct = "";
var gPx = 48;
function reception_banner_load(){
	var ajaxUrl = "?mod=reception_controller&mod_func=load";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:"index",
		dateType:"text",
		success:function(objData){
			var objData = JSON.parse(objData);
			
			if(objData['code'] == 'error'){
				alert(objData['msg']);
				return;
			}
			var jsonBanner = objData['data'];
			var objB = jsonBanner;

			var objBannerList = objB['0']["cp_banner"].split(",");
			for(str in objBannerList){
				var src = "./"+objBannerList[str];
				var li = "<li style='background-image:url("+src+");display:none'></li>";
				$(li).appendTo($(".ul2"));
			}
			$(".ul2 li").eq(0).css("display","block");
		}
	})
}

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

function reception_html_change(strHtml,strId = ''){
	if(strHtml == ""){
		alert("无法获取到strHtml参数");
		return;
	}
	var strSrc = "./web/"+strHtml+".html";
	console.log(strSrc);
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
		if(strHtml != 'index'){
			if(strId == ""){
				var func = "reception_"+strHtml+"_show()";
			}else{
				var func = "reception_"+strHtml+"_show(\""+strId+"\")";
			}  
			var func_load = new Function(func);	
			func_load();
		}
	
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

/***************************instroduce.js内容*/
function reception_instroduce_show(){
	var ajaxUrl = "?mod=reception_controller&mod_func=load";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:"instroduce",
		dateType:"text",
		success:function(objData){
			var objData = JSON.parse(objData);
			if(objData['code'] == 'error'){
				alert(objData['msg']);
				return;
			}
			var objInstroduce = objData['data'];
			var objPicture = objInstroduce['0']['cp_picture'].split(",");
			$(".instroduce_txt").html(objInstroduce[0]['cp_instroduce_culture']);
			$(".instroduce_team_text").html(objInstroduce[0]['cp_instroduce_team']);
			for(str in objPicture){
				var strSrc = "./img/"+objPicture[str];
				var li = "<li><img src="+strSrc+" class='img-responsive'></li>";
				$(li).appendTo($("#instroduce_ul"));
			}
		}
	})
}

/***************************product.js内容*/
function reception_product_load(){
	var ajaxUrl = "?mod=reception_controller&mod_func=load";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:"product",
		dateType:"text",
		success:function(objData){
			var objData = JSON.parse(objData);
			if(objData['code'] == 'error'){
				alert(objData['msg']);
				return;
			}
			var objProducts = objData['data'];
			var strProductBanner = objProducts['0']['menu_list']['0']['product_detail'];
			var objProductBanner = JSON.parse(strProductBanner);
			var strProduct = 'product';
			for(str in objProductBanner){
				var src = "./img/"+objProductBanner[str]["img_src"];
				var li = "<li onclick='reception_html_change(\""+strProduct+"\")' style='cursor:pointer'><div class='class_div1'><img src="+src+" class='img-responsive class_img1'></div><h5>"+str+"</h5><div><div class='text_detail1'>"+objProductBanner[str]["product_detail"]+"</div></div></li>"
				$(li).appendTo($(".product_banner"));
			}
			Gproduct = objProducts;
		}
	})	
}
function reception_product_show(strProductName){
	var objProduct = Gproduct;
	reception_product_menu(objProduct,$("#product_id"));
}
//生成产品的菜单
function reception_product_menu(objProduct,strParent){
	for(str in objProduct){
		if(objProduct[str]['menu_list']){
			var li =$("<li></li>");
			var id = str+"a";
			li = $(li).append("<a id="+id+" onclick='reception_product_menu_hide_func(this)'>"+objProduct[str]["product_name"]+"</a>");
			li = $(li).append("<ul style='list-style:none;display:none'></ul>");
			$(li).appendTo(strParent);
			reception_product_menu(objProduct[str]["menu_list"],$(li).children().eq(1));
		}else{
			var li = $("<li></li>");
			var objProductDetail = JSON.parse(objProduct[str]['product_detail']);
			console.log(objProductDetail);
			li = $(li).append("<a onclick='reception_product_detail(\""+objPost+"\")' id="+str+">"+objProduct[str]["product_name"]+"</a>");
			$(li).appendTo(strParent);
		}
		
	}
}
//显示隐藏
function reception_product_menu_hide_func(obj){
	var productId = obj.id;
	$("#"+productId).parent().children('ul').toggle();	
}
// 点击产品目录显示内容
function reception_product_detail(da){
	console.log(da);
}
/***************************news.js内容*/
function reception_news_load(){
	var ajaxUrl = "?mod=reception_controller&mod_func=load";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:"news",
		dateType:"text",
		success:function(objData){
			var objData = JSON.parse(objData);
			if(objData['code'] == 'error'){
				alert(objData['msg']);
				return;
			}
			var jsonNews = objData['data'];
			var objNews = jsonNews;
			var strNews = "news";
			for(str in objNews){
				var li = "<li onclick='reception_html_change(\""+strNews+"\",\""+objNews[str]["id"]+"\")'><span class='glyphicon glyphicon-volume-up'>"+objNews[str]["cp_news_tittle"]+"</span><li>";
				$(li).appendTo($(".C4li"));
			}
			Gnews = objNews;
		}
	})	
}
//点击新闻跳转到相应的模块并且在有strId的情况下展现某个新闻，没有的话默认第一个
function reception_news_show(strId=''){
	for(str in Gnews){
		if(strId != ''){
			if(strId == Gnews[str]["id"]){
				var strTittle = Gnews[str]['cp_news_tittle'];
				var strText = Gnews[str]['cp_news_detail'];
			}
		}
		var str = "<li onclick='reception_news_detail(\""+Gnews[str]['id']+"\")'>"+Gnews[str]["cp_news_tittle"]+"</li>";
		$("#news_ul").append(str);
	}
	if(strId == ''){
		var strTittle = Gnews['0']['cp_news_tittle'];
		var strText = Gnews['0']['cp_news_detail'];
		$(".news_text_tittle").html(strTittle);
		$(".news_text").html(strText);
	}else{
		$(".news_text_tittle").html(strTittle);
		$(".news_text").html(strText);			
	}	
}
//点击新闻模块的左侧的新闻标题展现内容
function reception_news_detail(strId){
	for(str in Gnews){
		if(strId != ''){
			if(strId == Gnews[str]["id"]){
				var strTittle = Gnews[str]['cp_news_tittle'];
				var strText = Gnews[str]['cp_news_detail'];
			}
		}
	}
	$(".news_text_tittle").html(strTittle);
	$(".news_text").html(strText);	
}

/***************************link.js内容*/