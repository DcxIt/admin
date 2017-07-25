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
			var li = $("<li></li>");
			li = $(li).append("<a id="+key+" onclick='cp_admin_main_hide_func(this)'>"+objMenu[key]["menu_name"]+"</a>");
			li = $(li).append("<ul style='list-style:none;display:none;padding:0'></ul>");
			$(li).appendTo(strParent);
			cp_admin_main_menu_apppend_func(objMenu[key]["menu_list"],$(li).children().eq(1));
		}else{
			console.log(key);
			var li = $("<li></li>");
			li = $(li).append("<a id="+key+" onclick='cp_admin_main_html_contents_func(this)'>"+objMenu[key]+"</a>");
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