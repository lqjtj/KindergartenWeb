<template>
  <div id="divmenu">
      <el-menu   router mode="vertical" default-active="1" class="el-menu-vertical-demo">
          <div v-for="item in items" :key="item.code">
                  <el-menu-item-group :title="item.title">
                        <div  v-for="item_sub in items_sub" :key="item_sub.code">
                            <template v-if="item.code==item_sub.code.substr(0,2)">
                                <el-menu-item  :index="item_sub.url"  ><i class="el-icon-message"></i>{{item_sub.title}}</el-menu-item>
                          </template>
                        </div>
                </el-menu-item-group>
          </div>
      </el-menu>
  </div>
</template>

<script>
 export default {
   data() {
      return {
        items: [],
        items_sub: []            
        }
   },
    created: function () {
        this.getMenu();
        //JSON.stringify(state.subscribeList);   // array -> string
        //JSON.parse(window.localStorage.getItem("subscribeList"));  
    }  ,
   methods: {
        getMenu(){
          let _this = this;
       var params = new URLSearchParams();
            params.append('userId', '15122922900');
            params.append('action', 'getmenu');

        var params_json={
                         userId:'15122922900',
                         action:'getMenu',
                         param1:'',
                         param2:'',
                         param3:'',
                         param4:'',
                         param5:''};

             var data = [];
             var data_sub = [];
             var j=0,k=0;
         this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           //alert(JSON.stringify(res.data));
           for (let i = 0; i < res.data.rows.length; i++) {
                var obj = {}
                obj.title = res.data.rows[i].title
                obj.code = res.data.rows[i].code
                obj.url = res.data.rows[i].url
                if(obj.code.length==2)
                  data[j++] = obj
                else
                   data_sub[k++] = obj
            }
           
            _this.items = data
            _this.items_sub = data_sub
           
        }).catch(function (error) {
               alert(error);
        })        
      }            
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #divmenu{
    height: 100%;
 }
 .el-menu-vertical-demo{
 height: 100%;
 }
.el-icon-message{
  height: 15px;
}

</style>
