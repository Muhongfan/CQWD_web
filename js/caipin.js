<script src="js/jquery-3.3.1.min.js"></script>
<!--<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>	-->
<script type="text/javascript" src="Select-or-Die/js/selectordie.min.js" ></script>
<link rel="stylesheet" href="Select-or-Die/css/selectordie.css" />
<link rel="stylesheet" href="Select-or-Die/css/selectordie_theme_02.css" />
<script type="text/javascript" src="js/cookieSet.js" ></script>
<script type="text/javascript">	
   $(document).ready(function(){ 
// 	var user_id=getCookie("user_id");
//  if(user_id==null || user_id=="")
//     window.location.href="login.html"; 
//  else
//     $("#username").text(getCookie("user_name"));
            
   	 $("#pageIndex").val(1);
     $.ajax({
                type: "POST",//方法类型
                url: "http://192.168.1.196:9090//outerApi/getAllFoodType",//url
                timeout : 1000, 
                contentType: "application/x-www-form-urlencoded",
                async: false,
                success: function (r) {
                	var result = eval( '(' + r + ')' );                              
                    if (result["rspCode"] == "DC00000") {                     	 
                       var fs=eval(result["food_type"]); 
                       $("#caixi").empty();
                       for (var i=0;i<fs.length;i++)
                       {
                       	var f=eval(fs[i]);
                       	addType(f.food_id,f.food_name);    
                       }
                       $("#caixi").selectOrDie();
                                           
                    }else
                      sweetAlert("提示",result["rspMsg"],"warning");
                },
              error : function() {
                    sweetAlert("提示","异常！","warning");
                }
            });
      var type=getParams("type");
      if(type!=null)
       selectType(type,1,1);
      else
       selectType(1,1,1);
         
     });
     
 function initPag(num)
 {
// 	$("#pag").empty();
// 	$("#pag").append('<li><a id="aPre" onclick="loadPre()" href="#">«</a></li>');
// 	for(var i=1;i<=num;i++)
// 	  $("#pag").append('<li><a id="a'+i+'" href="#">'+i+'</a></li>');
// 	$("#pag").append('<li><a id="aNext" onclick="loadNext()" href="#">»</a></li>');          	
 }
 
  function loadN(page)
 {
 	var index=Number($("#pageIndex").val());
 	var type=$("#caixi").val();
 	selectType(type,page,index);
 	
 }
 
 function loadPre()
 {
 	var index=Number($("#pageIndex").val());
 	var pre=index-1;
 	if(pre<1)
 	  return;
 	var type=$("#caixi").val();
 	selectType(type,pre,index);
 	
 }
 
  function loadNext()
 {
 	 var index=Number($("#pageIndex").val());
 	 var next=index+1; 	 
 	 var type=$("#caixi").val();
 	 selectType(type,next,index);
 	 
 		
 }
 
 function PageChange(index,next)
 {
 	if(index<1||next<1)
 	  return;
 	 document.getElementById('a'+index).setAttribute("class", ""); 
 	 document.getElementById('a'+next).setAttribute("class", "active"); 
 	 $("#pageIndex").val(next); 
 }
 
 function addType(id,name)
 { 
 	$("#caixi").append('<option  value="'+id+'">'+name+'</option>');
   	//form1.caixi.options.add(new Option(name,id));
   	if(getParams("type")==id)
   	{
   	  $("#caixi").val(id);	
   	} 	
 }
 
  function sele_Change(){
    var objS = form1.caixi;
    var type = objS.options[objS.selectedIndex].value;
    var index=Number($("#pageIndex").val());
    selectType(type,1,index);
  }
 
  function addFood(food,num)
 {
 	$("#cfFood").append('<div class="food"><img src="img/food/shaoe.jpg" /><ul><li><strong>菜名</strong>&nbsp;'
 	+food["food_name"]+'</li><li><strong>月销</strong>&emsp;'+food["food_monthlysales"]+'</li><li><strong>价格</strong>&emsp;'
 	+food["food_price"]+'</li><li><strong>会员价格</strong>&emsp;'+food["food_vip_price"]+'</li><li><div class="one"><strong>介绍</strong>&emsp;' 	
	+food["food_remark"]+food["food_remark"]+food["food_remark"]+food["food_remark"]+food["food_remark"]
	+'</div></li></ul><div><button class="btn-remove" onclick="removeF('+food["food_id"]+')"></button><span id="'+'foodSum'+food["food_id"]+'">'+num+'</span><button class="btn-add" onclick="addF('+food["food_id"]+')"></button></div></div>');
 }
 
 function addF(id)
 {
 	var sp=document.getElementById('foodSum'+id); 
 	var count=Number(sp.innerText)+1; 
 	sp.innerText=count;
 	submitF(id,count);	
 }
 
  function removeF(id)
 {
 	var sp=document.getElementById('foodSum'+id); 
 	var count=Number(sp.innerText)-1; 
 	if(count<0)
 	  return;
 	sp.innerText=count;
 	submitF(id,count);
 }
  function submitF(id,count)
  {
  	$.ajax({
                type: "POST",//方法类型
                url: "http://192.168.1.196:9090//outerApi/addFood?food_id="
                +id+"&food_num="+count+"&order_id="+getCookie("order_id"),//url
                timeout : 1000, 
                contentType: "application/x-www-form-urlencoded",
                async: false,
                success: function (r) {
                	var result = eval( '(' + r + ')' );                
                    //console.log(r);//打印服务端返回的数据(调试用)
                    if (result["rspCode"] == "DC00000") {  
                    	//sweetAlert("提示",result["rspMsg"],"warning");                   	  
                    }
                    else
                       sweetAlert("提示",result["rspMsg"],"warning");
                },
              error : function() {
                    //sweetAlert("提示","异常！","warning");
                }
            });
  }
 
 function selectType(type,page,index)
 {
 	$.ajax({
                type: "POST",//方法类型
                url: "http://192.168.1.196:9090//outerApi/getFoodByType?food_type_id="
                +type+"&food_page="+page+"&order_id="+getCookie("order_id"),//url
                timeout : 1000, 
                contentType: "application/x-www-form-urlencoded",
                async: false,
                success: function (r) {
                	var result = eval( '(' + r + ')' );                
                    //console.log(r);//打印服务端返回的数据(调试用)
                    if (result["rspCode"] == "DC00000") {  
                    	$("#cfFood").empty();
                    	var foods=eval( '(' + result["food_all"] + ')' );
                    	var num=eval( '(' + result["food_num"] + ')' ); 
                    	for(var i=0;i<foods.length;i++)    
                    	  addFood(foods[i],Number(num[i]));                     	   
                    	PageChange(index,page);  
                    	  
                    }else if (result["rspCode"] == "DC00011")
                    {
                    	sweetAlert("提示","没有更多菜品了，客官!","warning");                    	
                    }
                    else
                      sweetAlert("提示",result["rspMsg"],"warning");
                },
              error : function() {
                    //parent.sweetAlert("提示","异常！","warning");
                }
            });
 }
 
 //获取url中的参数
function getParams(key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            console.log("null");
            return null;
        };
 </script>
     

</html>
