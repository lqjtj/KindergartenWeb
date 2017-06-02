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
              <el-tree
            :data="department"
            :props="defaultProps"
            highlight-current
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :expand-on-click-node="false"
            >
          </el-tree>
       </div>
         <div style="clear:both;">
         <el-button type="primary" @click="onSave">保存</el-button> 
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="resetChecked">清空</el-button>         
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
        roleId:'' ,

        department:[],
        role_department:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        }           
      }
    },
   created: function () {
           this.getRole();
           this.getDepartment();
    },     
    methods: {
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys(['0020']);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },      
    getDepartment(){
          let _this=this
          var params_json={userId:'15122922900',action:'getdepartmentAdmin',param1:"",param2:"",param3:"",param4:'',param5:''};
          this.$http.post('/KindergartenWeb/action/tree.do',params_json,{withCredentials:true}).then(function (res) {
            //alert(JSON.stringify(res.data.rows)); [id,title,tag,children[]]
            _this.department=res.data.rows;
          }).catch(function (error) {
                alert('操作异常ooo')
          })     
      },            
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
     getRoleDepartments(roleid){
          var j=0;
         var data = [];
         let _this=this;

       var params_json={userId:'15122922900',action:'roleDepartmentlist',param1:roleid,param2:'',param3:'',param4:'', param5:''};
       this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           //alert(JSON.stringify(res.data));
           for (let i = 0; i < res.data.rows.length; i++) {
                  data[j++] = res.data.rows[i].depid
            }
            _this.role_department = data
            _this.$refs.tree.setCheckedKeys(_this.role_department);
           
        }).catch(function (error) {
               alert(error);
        })
        this.loading=false 
 },          
      onSave(){
          let _this=this
      
      var departments= this.$refs.tree.getCheckedKeys().join(',')
           var params = new URLSearchParams();
            params.append('roleId', this.roleId);
            params.append('departments', departments);

            this.$http.post('/KindergartenWeb/action/role/departments.do',params).then(function (res) {
          
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
        this.getRoleDepartments(val.id)
      }      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
