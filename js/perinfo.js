<script type="text/jacascript">
	function perinfomation(){
		var u= "http://192.168.1.196:9090//outerApi/login?user_phone="
        	+ +"&user_password="+;
		 $.ajax({
    	type:"post",
    	url:u,
        contentType: "application/x-www-form-urlencoded",
    	async:false;
    	success:fuction(perin){
    		var result = eval('('+perin+')');
    		 if (result["rspCode"] == "DC00000") {
                        alert("登录成功");                               
                    
                    
                     window.location.href='index.html';  
                    }else
                      alert(result["rspMsg"]);
    	},
    	 error : function() {
                    alert("异常！");
                }
    	});
		
	}
