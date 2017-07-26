var gAgentOrderCount = 0;
var gPage = 1;
var gLimit = 10;
function cp_agent_order_load(){
	$("#agent_order_page_ul").children().remove();
	cp_agent_order_count_all();
	cp_agent_order_fetch_list();	
}

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
	    		html += "<td><button onclick='cp_agent_order_change_show(\""+objList[strKey]["agent_email"]+"\",\""+objList[strKey]["agent_order_batch"]+"\",\""+objList[strKey]["agent_order_note"]+"\",\""+objList[strKey]["agent_order_price"]+"\",\""+objList[strKey]["agent_order_address"]+"\",\""+objList[strKey]["id"]+"\")' type='button' class='btn btn-warning' data-toggle='modal' data-target='#myModalChange'>修改</button><button type='button' onclick='cp_agent_order_delete(\""+objList[strKey]["id"]+"\")' style='margin-left:5px;' class='btn btn-danger delete'>删除</button></td>";
	    		html += "</tr>";
	    		$("#agent_order_table").append(html);
	    	}
	    }
	});	
}
function cp_agent_order_change_show(email,batch,contents,price,address,id){
	$("#text_agent_order_email").val(email);
	$("#text_agent_order_batch").val(batch);
	$("#text_agent_order_contents").val(contents);
	$("#text_agent_order_price").val(price);
	$("#text_agent_order_address").val(address);
	$("#text_agent_order_id").val(id);
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
//增加
function cp_agent_order_add(){
	var objPost = {};
	var agentName = $("#agent_order_agent_name").val();
	var agentEmail = $("#agent_order_agent_email").val();
	var agentOrderBatch = $("#agent_order_agent_batch").val();
	var agentOrderPrice = $("#agent_order_agent_price").val();
	var agentOrderContents = $("#agent_order_contents").val();
	var agentOrderAddress = $("#agent_order_agent_address").val(); 
	if(agentName == ""||agentEmail==""||agentOrderBatch == ""|| agentOrderPrice == "" || agentOrderContents == "" || agentOrderAddress == ""){
		alert("必填数据不能为空");
		return;
	}
	objPost = {agent_name:agentName,agent_email:agentEmail,agent_order_price:agentOrderPrice,
		agent_order_address:agentOrderAddress,agent_order_note:agentOrderContents,agent_order_batch:agentOrderBatch};
	var jsonPost = JSON.stringify(objPost);
	var ajaxUrl = "?mod=agent_order&mod_func=add";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:jsonPost,
		dataType:"text",
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == "0000"){
				alert(objData['msg']);
				cp_agent_order_load();
				return;
			}else{
				alert(objData['msg']);
			}
		}
	});
}
//删除
function cp_agent_order_delete(strId){
	if(strId == ""){
		alert("获取不到ID,删除失败");
		return;
	}
	var objPost = {};
	objPost = {id:strId};
	var jsonPost = JSON.stringify(objPost);
	var ajaxUrl = "?mod=agent_order&mod_func=delete";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:jsonPost,
		dataType:'text',
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == '0000'){
				alert(objData['msg']);
				cp_agent_order_load();
				return;
			}else{
				alert(objData['msg']);
			}
		}
	});
}
//修改
function cp_agent_order_change(){
	var agentEmail = $("#text_agent_order_email").val();
	var agentOrderContents = $("#text_agent_order_contents").val();
	var agentOrderBatch = $("#text_agent_order_batch").val();
	var agentOrderPrice = $("#text_agent_order_price").val();
	var agentOrderAddress = $("#text_agent_order_address").val();
	var id = $("#text_agent_order_id").val();
	var objPost = {};
	var objData = {};
	var objWhere = {};
	if(agentEmail == "" || agentOrderContents == "" || agentOrderAddress == "" || agentOrderBatch == "" || agentOrderPrice == "" ){
		alert("必填数据不能为空");
		return;
	}
	objData = {agent_email:agentEmail,agent_order_batch:agentOrderBatch,
		agent_order_address:agentOrderAddress,agent_order_price:agentOrderPrice,agent_order_note:agentOrderContents};
	objWhere = {id:id};
	objPost = {value:objData,where:objWhere};	
	var jsonPost = JSON.stringify(objPost);
	var ajaxUrl = "?mod=agent_order&mod_func=change";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:jsonPost,
		dataType:'text',
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == '0000'){
				alert(objData['msg']);
				cp_agent_order_load();
				return;
			}else{
				alert(objData['msg']);
			}
		}
	});	
}