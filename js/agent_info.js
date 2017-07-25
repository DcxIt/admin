
var gAgentInfoCount = 0;
var gPage = 1;
var gLimit = 10;
function cp_agent_info_load(){
	cp_agent_info_count_all();
	cp_agent_info_fetch_list();	
}
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
	   			var strData = JSON.stringify(objList[strKey]);
	    		html += "<td>"+objList[strKey]['agent_name']+"</td>";
	    		html += "<td>"+strSex+"</td>";
	    		html += "<td>"+objList[strKey]['agent_age']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_phone']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_email']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_address']+"</td>";
	    		html += "<td>"+objList[strKey]['agent_country']+"</td>";
	    		html += "<td><button onclick='cp_agent_info_change(\""+objList[strKey]["agent_name"]+"\",\""+strSex+"\",\""+objList[strKey]["agent_age"]+"\",\""+objList[strKey]["agent_phone"]+"\",\""+objList[strKey]["agent_email"]+"\",\""+objList[strKey]["agent_address"]+"\",\""+objList[strKey]["agent_country"]+"\",\""+objList[strKey]["id"]+"\")' type='button' class='btn btn-warning' data-toggle='modal' data-target='#myModalChange'>修改</button><button onclick='cp_agent_info_delete("+objList[strKey]['id']+")' type='button' class='btn btn-danger delete'>删除</button></td>";
	    		html += "</tr>";
	    		$("#agent_info_table").append(html);
	    	}
	    }
	});	
}

function cp_agent_info_change(agent_name,agent_sex,agent_age,agent_phone,agent_email,agent_address,agent_country,id){
	$("#text_agent_info_name").val(agent_name);
	$("#text_agent_info_age").val(agent_age);
	$("#text_agent_info_phone").val(agent_phone);
	$("#text_agent_info_email").val(agent_email);
	$("#text_agent_info_address").val(agent_address);
	$("#text_agent_info_country").val(agent_country);
	$("#text_agent_info_sex").val(agent_sex);
	$("#text_agent_info_id").val(id);
}

function cp_agent_info_change_submit(){
	var strAgentName = $("#text_agent_info_name").val();
	var strAgentAge = $("#text_agent_info_age").val();
	var strAgentPhone = $("#text_agent_info_phone").val();
	var strAgentEmail = $("#text_agent_info_email").val();
	var strAgentAddress = $("#text_agent_info_address").val();
	var strAgentCountry = $("#text_agent_info_country").val();
	var strAgentSex = $("#text_agent_info_sex").val();
	var id = $("#text_agent_info_id").val();
	var objPost = {};
	var objWhere = {};
	var objALL = {};
	if(strAgentSex == "" || strAgentCountry == "" || strAgentAddress == ""){
		alert("输入内容不能为空");
		return;
	}
	if(strAgentEmail == "" || strAgentName == "" || strAgentPhone == "" || strAgentPhone == ""){
		alert("输入内容不能为空");
		return;
	}
	objPost = {agent_name:strAgentName,agnet_age:strAgentAge,agent_phone:strAgentPhone,agent_email:strAgentEmail,agent_address:strAgentAddress,agent_country:strAgentCountry,agent_sex:strAgentSex};
	objWhere = {id:id};
	objALL ={where:objWhere,value:objPost};
	var strPost = JSON.stringify(objALL);
	var ajaxUrl = "?mod=agent_info&mod_func=change";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:strPost,
	    dataType:"text",
	    success:function(jsonData){
	    	var objData = JSON.parse(jsonData);
	    	alert(jsonData['msg']);
	    }
	})
}

function cp_agent_info_add(){
	var strAgentName = $("#add_agent_name").val();
	var strAgentAge = $("#add_agent_age").val();
	var strAgentEmail = $("#add_agent_email").val();
	var strAgentSex = $("#add_agent_sex").val();
	var strAgentCountry = $("#add_agent_country").val();
	var strAgentAddress = $("#add_agent_address").val();
	var strAgentPhone = $("#add_agent_phone").val();
	if(strAgentName == "" || strAgentAge == "" || strAgentEmail == "" || strAgentSex == "" || strAgentCountry == "" || strAgentAddress == "" || strAgentPhone == "" ||){
		alert("输入框不能为空");
		return;
	}
	var objPost ={agent_name:strAgentName,agent_age:strAgentAge,agent_email:strAgentEmail,agent_sex:strAgentSex,agent_country:strAgentCountry,
		agent_address:strAgentAddress,agent_phone:strAgentPhone};
	var jsonPost = JSON.stringify(objPost);
	var ajaxUrl = "?mod=agent_info&mod_func=add";
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:jsonPost,
		dataType:"text",
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			if(objData['code'] == '0000'){
				alert("客户创建成功");
				cp_agent_info_fetch_list(1,10);
				return;
			}else{
				alert(objData['msg']);
			}
		}
	});
}
function cp_agent_info_delete(strId){
	if(strId == ""){
		alert("获取删除条件失败");
		return;
	}
	var ajaxUrl = '?mod=agent_info&mod_func=delete';
	$.ajax({
		type:"POST",
		url:ajaxUrl,
		data:strId,
		dataType:"text",
		success:function(jsonData){
			var objData = JSON.parse(jsonData);
			alert(jsonData['msg']);
		}
	})
}