<template>
  <div class="hello">
   <el-table :data="tableData" style="width: 100%">
      <el-table-column 
        v-for="col in cols"
        :prop="col.prop" :label="col.label" :key="col.label">
      </el-table-column>
    </el-table>
    
    <el-button raw-type="button" @click="addCol">
      添加一列
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          cols: [
              {prop: 'date', label: '日期'},
            {prop: 'name', label: '姓名'},
          ]
        }
      },
      methods: {
          addCol(){
            this.cols.push({prop: 'address', label: '地址'})
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
