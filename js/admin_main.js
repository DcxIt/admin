$(document).ready(function(){ 
	cp_admin_main_left_menu();
}); 
function cp_admin_main_left_menu(){

	var ajaxUrl = "?mod=admin_main&mod_func=menu";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:"",
	    dataType:"text",
	    success:function(jsonData){
	    	var objMenu = JSON.parse(jsonData);
			cp_admin_main_menu_apppend_func(objMenu,$("#admin_main_left_menu_ul"));    
	    }
	});

}

function cp_admin_main_menu_apppend_func(objMenu,strParent){
	
	for(key in objMenu){
		if(objMenu[key]["menu_list"]){
			var li = $("<li class='left_menu_li_first'></li>");
			li = $(li).append("<a id="+key+" onclick='cp_admin_main_hide_func(this)'>"+objMenu[key]["menu_name"]+"</a>");
			li = $(li).append("<ul class='left_menu_li2' style='list-style:none;display:none;padding:0;background-color:white'></ul>");
			$(li).appendTo(strParent);
			cp_admin_main_menu_apppend_func(objMenu[key]["menu_list"],$(li).children().eq(1));
		}else{
			var li = $("<li></li>");
			li = $(li).append("<a id="+key+" onclick='cp_admin_main_html_contents_func(this)'>&nbsp&nbsp&nbsp"+objMenu[key]+"</a>");
			$(li).appendTo(strParent);
		}
		
	}
}

function cp_admin_main_hide_func(obj){
	var menu_key = obj.id;
	$("#"+menu_key).parent().children('ul').toggle();
}

function cp_admin_main_html_contents_func(obj){
	var menu_key = obj.id;
	var ajaxUrl = "?mod=admin_main&mod_func=html_contents";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:menu_key,
		dataType:"text",
		success:function(jsonData){
			$("#admin_main_contents").html("");
			$(jsonData).appendTo($("#admin_main_contents"));
			var func ="return "+"cp_"+menu_key+"_load"+"()";
			var first_load = new Function(func);
			first_load();
		}

	})
}

function cp_admin_main_back(admin_name){
	if(admin_name == ""){
		alert("无法获取到账户退出失败");
		return;
	}
	var ajaxUrl = "?mod=admin_main&mod_func=sign_out";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:admin_name,
		dataType:"text",
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == "0000"){
				alert(objData['msg']);
				window.location.href = "?action=login";
				return;
			}
			alert(objData['msg']);
		}

	})	
}