<template>
<div>
    <el-tree
      :data="data2"
      :props="defaultProps"
      highlight-current
      show-checkbox
      node-key="id"
      default-expand-all
      @node-click="onClick"
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>

<el-dialog title="节点信息" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="节点编码" :label-width="formLabelWidth">
      <el-input v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="节点名称" :label-width="formLabelWidth">
       <el-input v-model="form.label" auto-complete="off"></el-input>
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
        formLabelWidth:80,
        optype:'',
        form:{
            id:'',
            label:''
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
        var params_json={userId:'15122922900',action:'getdepartment',param1:"",param2:"",param3:"",param4:'',param5:''};

         this.$http.post('/KindergartenWeb/action/tree.do',params_json,{withCredentials:true}).then(function (res) {
           //alert(JSON.stringify(res.data.rows));
           _this.data2=res.data.rows;
        }).catch(function (error) {
              alert('操作异常ooo')
        })     
    },
     onFormSave(){
       this.dialogFormVisible=false;
       if(this.optype=="insert"){
        this.obj_parent.splice(this.obj_index,0,{id: this.form.id, label:this.form.label , children: [] });
       }else if(this.optype=="update"){
         this.obj_current.id=this.form.id;
         this.obj_current.label=this.form.label;
       }
        this.form.id='';
        this.form.label='';
     } ,     
    getArray(data,name)
    {
        for (var i in data) {
            console.log('i',i);
            console.log('datai',data[i].children);
            //alert(data[i].label);
            if (data[i].label == name) {
                alert(data[i].label);
                this.obj_index=i;
                this.obj_parent=data;
                return;
            } else {
                this.getArray(data[i].children, name);
            }
        }
    },
      onClick(data,node,self){
        // alert(data.label);
         
         // alert((node));
         // alert(JSON.stringify(self));
         //this.data2.splice(1,1,{id:id++,label:'00',children: []});
      },
      update(store, data) {
        this.optype='update';
        this.obj_current=data;
        this.form.id=data.id;
        this.form.label=data.label;
        this.dialogFormVisible=true;
      },      
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },
     insert(store, data) {
       this.optype='insert';
       this.dialogFormVisible = true;
       this.getArray(this.data2,data.label);
        //alert(this.obj_parent.length+"\n"+this.obj_index);
        //this.obj_parent.splice(this.obj_index,0,{id: id++, label: 'testtest', children: [] });
      },
      remove(store, data) {
        store.remove(data);
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
          </span>);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
