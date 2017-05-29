<template>
<div>
    <el-tree
      :data="data2"
      :props="defaultProps"
      highlight-current
      node-key="id"
      default-expand-all
    
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>

<el-dialog title="节点信息" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="节点编码" :label-width="formLabelWidth">
      <el-input v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="节点名称" :label-width="formLabelWidth">
       <el-input v-model="form.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="序号" :label-width="formLabelWidth">
       <el-input v-model="form.tag" auto-complete="off"></el-input>
    </el-form-item>    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onFormSave">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
let id = 1000;

  export default {
    data() {
      return {
        formLabelWidth:'80',
        optype:'',
        form:{
            id:'',
            title:'',
            tag:'',
            idx:''
        },
         dialogFormVisible: false,
        obj_parent:{},
        obj_current:{},
        obj_index:0,
        fcode:'',
        code:'',
        title:'',
        order:'',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
 created: function () {
        this.getTree();
    }  ,  
methods: {
    getTree(){
        let _this=this
        var params_json={userId:'15122922900',action:'getdepartmentAdmin',param1:"",param2:"",param3:"",param4:'',param5:''};
         this.$http.post('/KindergartenWeb/action/tree.do',params_json,{withCredentials:true}).then(function (res) {
           //alert(JSON.stringify(res.data.rows)); [id,title,tag,children[]]
           _this.data2=res.data.rows;
        }).catch(function (error) {
              alert('操作异常ooo')
        })     
    },
     onFormSave(){
       this.dialogFormVisible=false;
       let _this=this
       if(this.optype=="insert"){
                //this.obj_parent.splice(this.obj_index,0,{id: this.form.id,title:this.form.title , children: [] });
              var params_json={depId:this.form.id,depTitle:this.form.title,tag:this.form.tag,depIdx:''};
              this.$http.post('/KindergartenWeb/action/dep/add.do',params_json,{withCredentials:true}).then(function (res) {

                if(res.data==1){
                      _this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                        _this.getTree();  
                }    
            }).catch(function (error) {
                _this.$message.error(error);
            })             
       }else if(this.optype=="update"){
              var params_json={depId:this.form.id,depTitle:this.form.title,tag:this.form.tag,depIdx:this.form.idx};
              this.$http.post('/KindergartenWeb/action/dep/update.do',params_json,{withCredentials:true}).then(function (res) {
  
                if(res.data==1){
                      _this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                        _this.getTree();  
                }    
            }).catch(function (error) {
                _this.$message.error(error);
            })  
       }
        this.form.id='';
        this.form.title='';
        this.form.tag='';
        this.form.idx='';
     } ,     
    getArray(data,id)
    {
        for (var i in data) {
            if (data[i].id == id) {
                this.obj_index=i;
                this.obj_parent=data;
                return;
            } else {
                this.getArray(data[i].children, id);
            }
        }
    },
      onClick(data,node,self){
         // alert(JSON.stringify(self));
         //this.data2.splice(1,1,{id:id++,label:'00',children: []});
      },
      update(store, data) {
        this.optype='update';
        this.obj_current=data;
        this.form.id=data.id;
        this.form.idx=data.id;
        this.form.title=data.title.replace('['+data.id+']','');
        this.form.tag=data.tag;
        this.dialogFormVisible=true;
      },      
      append(store, data) {
        //store.append({ id: id++, label: 'testtest', children: [] }, data);
       this.optype='insert';
       this.form.id=data.id;
        this.form.title="";
        this.form.tag="";
       this.dialogFormVisible = true;
      },
     insert(store, data) {
       this.optype='insert';
       this.form.id=data.id.substring(0,data.id.length-2);
        this.form.title="";
        this.form.tag="";

        this.getArray(this.data2,data.id);
       this.dialogFormVisible = true;
      },
      remove(store, data) {
        //alert(JSON.stringify(data))
        //store.remove(data);
             let _this=this
              var params_json={key:data.id};

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  _this.$http.post('/KindergartenWeb/action/dep/delete.do',params_json,{withCredentials:true}).then(function (res) {
                      if(res.data==1){
                            _this.$message({
                              message: '删除成功！',
                              type: 'success'
                          });
                              _this.getTree();  
                      }    
                  }).catch(function (error) {
                      _this.$message.error(error);
                  })  
            }).catch(() => {
                
            }); 
       
      },
      renderContent(h, { node, data, store }) {
        return (<span>
                    <span>
                      <span>{node.label}</span>
                    </span>
                    <span style="float: right; margin-right: 20px">
                        <el-button size="mini" on-click={ () => this.insert(store, data) }>插入新节点</el-button>
                        <el-button size="mini" on-click={ () => this.update(store, data) }>修改节点信息</el-button>
                        <el-button size="mini" on-click={ () => this.append(store, data) }>增加子节点</el-button>
                        <el-button size="mini" on-click={ () => this.remove(store, data) }>删除节点</el-button>
                    </span>
           </span>
          );
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test{
   width:100px;
   display: none;
}
</style>
