var change = new Vue({
    el:'#change',
    data:function(){
        return{  
            chooseList:[
                {classify:100,checked:false},
                {classify:200,checked:false},
                {classify:500,checked:false},
                {classify:1000,checked:false},
                {classify:1500,checked:false},
                {classify:2000,checked:false}
            ],
            fillIn:false,
            tab_index:0
        }
    },
    methods:{
        ready:function(){
              var this_obj = this;
              var tab_index = this_obj.tab_index;
              console.log(tab_index);
              this_obj.chooseList[tab_index].checked = true;
          },
      

        chooseRechange:function(index){
            var this_obj = this;
            for(var i = 0;i < this_obj.chooseList.length;i++){
                this_obj.chooseList[i].checked = false;
            }
            this_obj.chooseList[index].checked = true;
            money=this_ this_obj.chooseList[index].classify;
  
            
            })
            
        }
    }
})
change.ready();