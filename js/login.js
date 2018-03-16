<script type="text/javascript" >
loginin=function()
{
	if(form1n.user.value==""||form1.pass.value=="")
	{
		sweetAlert("Plz enter your info!");
		return;
	}
	var usrnum=form1.user.value;
	if (!isPoneAvailable(usrnum))
	{
		sweetAlert("unvalid num!");
		return;
	}

	var psd=  hex_sha1(form1.pass.value);
	console.log(usrnum);
	console.log(psd);
	var u= "http://192.168.1.196:9090//outerApi/login?user_phone="
        	+usrnum+"&user_password="+psd;
    $.ajax({
    	type:"post",
    	url:u,
        contentType: "application/x-www-form-urlencoded",
    	async:false;
    	success:fuction(res){
    		var result = eval('('+res+')');
    		 if (result["rspCode"] == "DC00000") {
                        alert("登录成功");                               
                   SetCookie("user_id",result["user_id"]);
                     SetCookie("user_name",result["user_name"]);  
                     SetCookie("user_password",psd); 
                     SetCookie("user_phone",usrnum); 
                     SetCookie("member_level",result["member_level"]);
                     setTimeout('window.location.href="index.html";',2000);  
                    // window.location.href='index.html';                       
                    }else
                      sweetAlert("提示",result["rspMsg"],"warning");
                },
              error : function() {
                    sweetAlert("提示","异常！","warning");
                }
            });
        
        }
        
       function isPoneAvailable(str) {  
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(str)) {  
              return false;  
          } else {  
              return true;  
          }  
      }
        
    </script>
    <script type="text/javascript" src="js/sha1.js"></script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/cookieSet.js" ></script>
