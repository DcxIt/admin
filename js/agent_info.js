
var gAgentInfoCount = 0;
var gPage = 1;
var gLimit = 10;
$(document).ready(function(){ 
	cp_agent_info_count_all();
	cp_agent_info_fetch_list();
}); 
function cp_agent_info_count_all(){
	var ajaxUrl = "?mod=agent_info&mod_func=count_all";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:"",
	    dataType:"text",
	    success:function(jsonData){
	    	var objData = JSON.parse(jsonData);
	    	if(objData['code'] == "error"){
	    		alert(objData['msg']);
	    		return;
	    	}
	    	gAgentInfoCount = objData['backData'];
	    	var sumPage = Math.ceil(gAgentInfoCount/gLimit);
	    	var firstHtml = "<li><a onclick='cp_agent_info_fetch_list(1,10)'>第一页</a></li>";
	    	var lastHtml = "<li><a onclick='cp_agent_info_fetch_list("+sumPage+",10)'>最后一页</a></li>";
	    	$("#agent_info_sum_numbers").html(gAgentInfoCount);
	    	$("#agent_info_page_ul").append(firstHtml);
	    	for(var i = 0;i < sumPage; i++){
	    		var page = i + 1;
	    		var html = "<li><a onclick='cp_agent_info_fetch_list("+page+",10)'>"+page+"</a></li>";
	    		$("#agent_info_page_ul").append(html);
	    	}
	    	$("#agent_info_page_ul").append(lastHtml);
	    }
	});		
}
function cp_agent_info_fetch_list(gPage=1,gLimit=10){
	var obj = {};
	obj['page'] = gPage;
	obj['limit'] = gLimit;
	var jsonData = JSON.stringify(obj);
	var ajaxUrl = "?mod=agent_info&mod_func=list";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:jsonData,
	    dataType:"text",
	    success:function(jsonData){
	    	var objData = JSON.parse(jsonData);
	    	if(objData['code'] == "error"){
	    		alert(objData['msg']);
	    		return;
	    	}
	    	var objList = objData['backData'];
	    	var strSex = '';
	    	$("#agent_info_table").html("");
	    	$("#agent_info_page_now").html(gPage);
	    	for(strKey in objList){
	    		var html = "<tr>";
	   			if(objList[strKey]['agent_sex'] == 1){
	   				strSex = '男';
	   			}else{
	   				strSex = '女'
	   			}
	   			console.log(objList[strKey]);
	   			var strData = JSON.stringify(objList[strKey]);
	    		html += "<td>"+objList[strKey]['agent_name']+"</td>";
	    		html += "<td>"+strSex+"</td>";
	    		html += "<td>"+objList[strKey]['agent_age']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_phone']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_email']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_address']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_country']+"</td>";
	    		html += '<td><button onclick="cp_agent_info_change()" type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModalChange">修改</button><button type="button" class="btn btn-danger delete">删除</button></td>';
	    		html += "</tr>";
	    		$("#agent_info_table").append(html);
	    	}
	    }
	});	
}

function cp_agent_info_change(obj){
	console.log(obj);
	$("#text_agent_info_name").val(obj['agent_name']);
	$("#text_agent_info_age").val(obj['agent_age']);
	$("#text_agent_info_phone").val(obj['agent_phone']);
	$("#text_agent_info_email").val(obj['agent_email']);
	$("#text_agent_info_address").val(obj['agent_address']);
	$("#text_agent_info_country").val(obj['agent_country']);
	$("#text_agent_info_sex").val(obj['agent_sex']);
}