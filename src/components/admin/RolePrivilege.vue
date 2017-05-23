<template>
  <div>
      <el-table
        :data="roleList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 20%">
        <el-table-column
          property="id"
          label="#"
          style="width: 20%">
        </el-table-column>    
        <el-table-column
          property="title"
          label="角色"
          style="width: 80%">
        </el-table-column>
      </el-table>


     <el-table
    :data="tableData3"
    border
    tooltip-effect="dark"
    @selection-change="handleSelectionChange">

    <el-table-column
      label="日期"
      width="120">
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
     <el-table-column
      :render-header="renderHeader" 
      width="100">
     <template scope="scope">
         <el-checkbox v-model="scope.row.cs"></el-checkbox>
      </template>      
    </el-table-column>
     
    <el-table-column
      :render-header="renderHeader" 
      width="100">
      <template scope="scope">
         <el-checkbox v-model="scope.row.ci"></el-checkbox>
      </template>      
    </el-table-column>
    <el-table-column
      :render-header="renderHeader" 
      width="100">
      <template scope="scope">
         <el-checkbox v-model="scope.row.cu"></el-checkbox>
      </template>      
    </el-table-column>
    <el-table-column
      :render-header="renderHeader" 
      width="100">
      <template scope="scope">
         <el-checkbox v-model="scope.row.cd"></el-checkbox>
      </template>
    </el-table-column>
   <el-table-column
      :render-header="renderHeader" 
      width="100">
       <template scope="scope">
         <el-checkbox v-model="scope.row.co"></el-checkbox>
      </template>
    </el-table-column>                
  </el-table>     
  </div>
</template>

<script>
 export default {
    data() {
      return {
        roleList:[],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          cs:true,
          ci:false,
          cu:false,
          cd:true,
          co:true
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          cs:true,
          ci:false,
          cu:false,
          cd:true,
          co:true
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
           cs:true,
          ci:false,
          cu:false,
          cd:true,
          co:true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
           cs:true,
          ci:false,
          cu:false,
          cd:true,
          co:true
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          cs:true,
          ci:false,
          cu:false,
          cd:true,
          co:true
        }],
        multipleSelection: []
      }
    },
    created: function () {
           this.getData();
    }  ,    
    methods: {
     renderHeader(h, { column, $index }){
         if($index==2)
           return (<span> <el-checkbox >Select</el-checkbox></span>);
         else if($index==3)
             return (<span> <el-checkbox >insert</el-checkbox></span>);
         else if($index==4)
             return (<span> <el-checkbox >update</el-checkbox></span>);
         else if($index==5)
             return (<span> <el-checkbox >delete</el-checkbox></span>);
         else if($index==6)
             return (<span> <el-checkbox >other</el-checkbox></span>);                                       
     },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },      
       handleCurrentChange(val) {
        alert(val.id);
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
