function cp_login_check(){
	var strAdminName = $("#login_admin_name").val();
	var strPassword = $("#login_admin_password").val();
	var objPost = {};
	if(strPassword == "" || strAdminName == ""){
		alert("输入不能为空");
		return;
	}
	objPost = {admin_name:strAdminName,admin_password:strPassword};
	var strPost = JSON.stringify(objPost);
	var ajaxUrl = "?mod=admin_login&mod_func=check";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:strPost,
	    dataType:"text",
	    success:function(jsonData){
	    	console.log(jsonData);
	    	$objData = JSON.parse(jsonData);
	    	if($objData['code'] == "1000"){
	    		alert($objData['msg']);
	    		return;
	    	}else{
	    		alert($objData['msg']);
	    		window.location.href = "?action=admin";
	    	}
	    }
	});	
}