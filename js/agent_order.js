var gAgentOrderCount = 0;
var gPage = 1;
var gLimit = 10;
$(document).ready(function(){ 
	cp_agent_order_count_all();
	cp_agent_order_fetch_list();
}); 

function cp_agent_order_fetch_list(gPage=1,gLimit=10){
	var obj = {};
	obj['page'] = gPage;
	obj['limit'] = gLimit;
	var jsonData = JSON.stringify(obj);
	var ajaxUrl = "?mod=agent_order&mod_func=list";
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
	    	$("#agent_order_table").html("");
	    	$("#agent_order_page_now").html(gPage);
	    	for(strKey in objList){
	    		var html = "<tr>";
	   			var strData = JSON.stringify(objList[strKey]);
	    		html += "<td>"+objList[strKey]['agent_name']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_email']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_number']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_batch']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_price']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_address']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_status']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_send_date']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_order_recev_date']+"</td>";
	    		html += '<td><button onclick="cp_agent_order_change()" type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModalChange">修改</button><button type="button" class="btn btn-danger delete">删除</button></td>';
	    		html += "</tr>";
	    		$("#agent_order_table").append(html);
	    	}
	    }
	});	
}

function cp_agent_order_count_all(){
	var ajaxUrl = "?mod=agent_order&mod_func=count_all";
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
	    	gAgentOrderCount = objData['backData'];
	    	var sumPage = Math.ceil(gAgentOrderCount/gLimit);
	    	var firstHtml = "<li><a onclick='cp_agent_order_fetch_list(1,10)'>第一页</a></li>";
	    	var lastHtml = "<li><a onclick='cp_agent_order_fetch_list("+sumPage+",10)'>最后一页</a></li>";
	    	$("#agent_order_sum_numbers").html(gAgentOrderCount);
	    	$("#agent_order_page_ul").append(firstHtml);
	    	for(var i = 0;i < sumPage; i++){
	    		var page = i + 1;
	    		var html = "<li><a onclick='cp_agent_order_fetch_list("+page+",10)'>"+page+"</a></li>";
	    		$("#agent_order_page_ul").append(html);
	    	}
	    	$("#agent_order_page_ul").append(lastHtml);
	    }
	});
}