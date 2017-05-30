<template>
  <div>
      <div style="float:left;">
          <el-table
            :data="roleList"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 80">
            <el-table-column
              property="id"
              label="#"
              style="width:10">
            </el-table-column>    
            <el-table-column
              property="title"
              label="角色"
              style="width:50">
            </el-table-column>
          </el-table>
     </div>

       <div style="float:left;margin-left:20px;" >
            <el-table
                :data="roleUsers"
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label=""
                  width="55">
                     <template scope="scope">
                            <el-checkbox v-model="scope.row.valid"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                  label="#"
                  prop="hkey"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
              </el-table>
       </div>
         <div style="clear:both;">
         <el-button type="primary" @click="onSave">保存</el-button> 
    </div> 
  </div>
</template>

<script>
 export default {
    data() {
      return { 
       loading:false,
        roleList:[],
        roleUsers:[] ,
        roleId:''        
      }
    },
   created: function () {
           this.getRole();
    },     
    methods: {      
       getRole(){
        var j=0;
         var data = [];
         let _this=this;

       var params_json={userId:'15122922900',action:'getRole',param1:'',param2:'',param3:'',param4:'',param5:''};
       this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           for (let i = 0; i < res.data.rows.length; i++) {
                var obj = {}
                obj.title = res.data.rows[i].title
                obj.id = res.data.rows[i].id
                  data[j++] = obj
            }
            _this.roleList = data
        }).catch(function (error) {
               alert(error);
        }) 
        },
     getRoleUsers(roleid){
          var j=0;
         var data = [];
         let _this=this;

       var params_json={userId:'15122922900',action:'roleUserslist',param1:roleid,param2:'',param3:'',param4:'', param5:''};
       this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           //alert(JSON.stringify(res.data));
           for (let i = 0; i < res.data.rows.length; i++) {
                var obj = {}
                obj.hkey=res.data.rows[i].hkey
                obj.name = res.data.rows[i].name
                obj.roleId=_this.roleId
                if(res.data.rows[i].valid=='0')
                    obj.valid=false
                else
                    obj.valid=true
 
                  data[j++] = obj
            }
            _this.roleUsers = data
           
        }).catch(function (error) {
               alert(error);
        })
        this.loading=false 
 },          
      onSave(){
          let _this=this
          var userx=[]
          var j=0
          for(var i =0;i<this.roleUsers.length;i++){
　                if(this.roleUsers[i].valid){
                      userx[j++]=this.roleUsers[i];
                  }
             }
           //角色成员都清空时需要补充一条数据,用于后端清空操作  hkey=-1
            if(userx.length==0){
              var obj = {}
              obj.hkey='-1'
              obj.name=''
              obj.valid=false
              obj.roleId=this.roleId
              userx[0]=obj
            }
             
          var params_json=userx
           //alert(JSON.stringify(params_json));
            this.$http.post('/KindergartenWeb/action/role/users.do',params_json,{withCredentials:true}).then(function (res) {
          
          if(JSON.stringify(res.data)=='1'){
                _this.$message({
                  //showClose: true,
                  message: '保存成功！',
                  type: 'success'
              });
          }else{
               _this.$message({
                  showClose: true,
                  message: '保存失败！',
                  type: 'success'
              });           
          }
        }).catch(function (error) {
            _this.$message.error(error);
        })     
      },
       handleCurrentChange(val) {
        this.loading=true
        this.roleId=val.id
        this.getRoleUsers(val.id)
      }      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
