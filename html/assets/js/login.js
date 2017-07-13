function cp_login_check(){
	var strAdminName = $("#login_admin_name").val();
	var strPassword = $("#login_admin_password").val();
	var objPost = {};
	if(strPassword == "" || strAdminName == ""){
		alert("输入不能为空");
		return;
	}
	objPost = {admin_name:strAdminName,admin_password:strPassword};
	console.log(objPost);
	//objPost['admin_password'] = strPassword;
	var strPost = JSON.stringify(objPost);
	console.log(strPost);
	var ajaxUrl = "?action=admin_login";
	$.ajax({
	    type:"POST",
	    url:ajaxUrl,
	    data:strPost,
	    dataType:"text",
	    success:function(data){
	    	alert(data);
	    }
	});	
}