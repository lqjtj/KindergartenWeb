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
          :data="privilegeList"
          v-loading.body="loading"
          border
          tooltip-effect="dark">
          <el-table-column
            prop="resourceId"
            label="#"
            width="80">
          </el-table-column>
          <el-table-column
           ref='coltitle'
            prop="resourceTitle"
            label="title"
            width="150">
          </el-table-column>
          <el-table-column 
            :render-header="renderHeader" 
            width="80">
          <template scope="scope">
              <el-checkbox v-model="scope.row.cs"></el-checkbox>
            </template>      
          </el-table-column>
          
          <el-table-column
            :render-header="renderHeader" 
            width="80">
            <template scope="scope">
              <el-checkbox v-model="scope.row.ci"></el-checkbox>
            </template>      
          </el-table-column>
          <el-table-column
            :render-header="renderHeader" 
            width="80">
            <template scope="scope">
              <el-checkbox v-model="scope.row.cu"></el-checkbox>
            </template>      
          </el-table-column>
          <el-table-column
            :render-header="renderHeader" 
            width="80">
            <template scope="scope">
              <el-checkbox v-model="scope.row.cd"></el-checkbox>
            </template>
          </el-table-column>
        <el-table-column
            :render-header="renderHeader" 
            width="80">
            <template scope="scope">
              <el-checkbox v-model="scope.row.co"></el-checkbox>
            </template>
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
        csall:false,
        ciall:false,
        cuall:false,
        cdall:false,
        coall:false,
        privilegeList: [{
          roleId:'',
          resourceId: '',
          resourceTitle: '',
          cs:false,
          ci:false,
          cu:false,
          cd:false,
          co:false
        }]
      }
    },
    created: function () {
           this.getData();
    }, 
    watch: {
        csall: function (val, oldVal) {
          console.log('new: %s, old: %s', val, oldVal)
          for (let i = 0; i < this.privilegeList.length; i++) {
                 this.privilegeList[i].cs=val;
            }
            return true
        },
      ciall: function (val, oldVal) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                 this.privilegeList[i].ci=val;
            }
        },
      cuall: function (val, oldVal) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                 this.privilegeList[i].cu=val;
            }
        },
      cdall: function (val, oldVal) {
             for (let i = 0; i < this.privilegeList.length; i++) {
                 this.privilegeList[i].cd=val;
            }
        },
      coall: function (val, oldVal) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                 this.privilegeList[i].co=val;
            }
        }                    
    },       
    methods: {
      onSave(){
          let _this=this
          var params_json=this.privilegeList
           //alert(JSON.stringify(params_json));
            this.$http.post('/KindergartenWeb/action/role/privilege.do',params_json,{withCredentials:true}).then(function (res) {
          
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
    getPrivilege(roleid){
          var j=0;
         var data = [];
         let _this=this;

       var params_json={
                         userId:'15122922900',
                         action:'getPrivilege',
                         param1:roleid,
                         param2:'',
                         param3:'',
                         param4:'',
                         param5:''};
                 this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           //alert(JSON.stringify(res.data));
           for (let i = 0; i < res.data.rows.length; i++) {
                var obj = {}
                obj.roleId=roleid
                obj.resourceId = res.data.rows[i].resourceId
                obj.resourceTitle = res.data.rows[i].resourceTitle
                if(res.data.rows[i].cs=='1')
                    obj.cs=true
                else
                    obj.cs=false

                if(res.data.rows[i].ci=='1')
                    obj.ci=true
                else
                    obj.ci=false

               if(res.data.rows[i].cu=='1')
                    obj.cu=true
                else
                    obj.cu=false

               if(res.data.rows[i].cd=='1')
                    obj.cd=true
                else
                    obj.cd=false

               if(res.data.rows[i].co=='1')
                    obj.co=true
                else
                    obj.co=false                                                                               
 
                  data[j++] = obj
            }
           
            _this.privilegeList = data
           
        }).catch(function (error) {
               alert(error);
        })
        this.loading=false 
 },      
     renderHeader(h, { column, $index }){
       var self = this

       if($index==2){
          return h('el-checkbox',{
                      domProps: {
                        label:'查询',
                        value:this.csall,
                      }, 
                      on: {
                        change: function (e) {
                          self.csall= e.target.checked
                        }                       
                      }
                })
         }
         else if($index==3){
              return  h('el-checkbox', {
                            domProps: {
                              label:'新建',
                              value:this.ciall
                            },
                            on: {
                              change: function (e) {
                                self.ciall= e.target.checked
                              }
                            }
                          }
                      )
         }
         else if($index==4){
              return  h('el-checkbox', {
                              domProps: {
                                label:'修改',
                                value:this.cuall
                              },
                              on: {
                                change: function (e) {
                                  self.cuall= e.target.checked
                                }
                              }
                            }
                        )
         }
         else if($index==5){
              return  h('el-checkbox', {
                              domProps: {
                                label:'删除',
                                value:this.cdall
                                 },
                              on: {
                                change: function (e) {
                                  self.cdall= e.target.checked
                                }
                              }
                            }
                        )
         }
         else if($index==6){
                return  h('el-checkbox', {
                                domProps: {
                                  label:'其它',
                                  value:this.coall 
                                   },
                                on: {
                                  change: function (e) {
                                    self.coall= e.target.checked
                                  }
                                }
                              }
                          )
         }
            // return (<span> <el-checkbox v-model="coall" on-change={()=> this.onChange( column, $index)}>other</el-checkbox></span>);                                       
     },
       handleCurrentChange(val) {
         // console.log(csobj)

        this.csall=false
        this.ciall=false
        this.cuall=false
        this.cdall=false
        this.coall=false

        this.loading=true
        
        this.getPrivilege(val.id);
      } ,     
        getData(){
        var j=0;
         var data = [];
         let _this=this;

       var params_json={
                         userId:'15122922900',
                         action:'getRole',
                         param1:'',
                         param2:'',
                         param3:'',
                         param4:'',
                         param5:''};
                 this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
           //alert(JSON.stringify(res.data));
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
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
