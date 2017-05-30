<template>
<div>
     <el-checkbox-group 
    @change="onChange"
    v-model="checkedCities1"
    :min="0"
    :max="2">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
   
   <p/>

    <el-radio-group v-model="radio2">
    <el-radio label="男">男</el-radio>
    <el-radio label="女">女</el-radio>
  </el-radio-group>

    <p/>

 <el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></el-autocomplete>

<p/>

 <el-select v-model="value7" placeholder="请选择" @change="onSelectChange">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>

<p/>

 <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>

    <p/>
     <el-button type="text" @click="open2">点击打开 Message Box</el-button>

<p/>

<!-- Form -->
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

<el-dialog title="收货地址" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>     

<el-upload
  class="avatar-uploader"
  action="/KindergartenWeb/file/upload2.do"
  :show-file-list="false"
  :data="formupload"
  :on-success="handleAvatarSuccess"
  :on-error="handleAvatarFailure"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

<hr/>
<el-upload
  class="upload-demo"
  ref="upload"
  multiple
  with-credentials
  action="/KindergartenWeb/file/upload2.do"
  :data="formupload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleAvatarSuccess"
  :on-error="handleAvatarFailure"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button  size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <el-button  size="small" type="info" @click="uploaded">查看已上传内容</el-button>

  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

<el-dialog title="已上传内容" v-model="dialogTableVisible">
  <el-table :data="dataUploaded" height=300 highlight-current-row @current-change="handleCurrentChange"  v-loading.body="loading">
    <el-table-column property="id" label="#" width="50"></el-table-column>
    <el-table-column property="name" label="姓名" width="100"></el-table-column>
    <el-table-column property="fname" label="文件名"></el-table-column>
    <el-table-column property="inserttime" label="上传时间"></el-table-column>
  </el-table>
    <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogTableClose">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
 const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        imageUrl: '',
         bloading:false,
         formupload:{},
         fileList: [],

          dialogFormVisible: false,
          dialogTableVisible:false,
          dataUploaded:[],
          currentRow: {},

   form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         formLabelWidth: '120px',

          value1: '',
          pickerOptions0: {
          disabledDate(time) {
            return null;//time.getTime() < Date.now() - 8.64e7;
          }
        },

         restaurants: [],
        state4: '',
        timeout:  null,

        radio2: '女',

        checkedCities1: ['上海', '北京'],
        cities: cityOptions,

 options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        value7: ''        
      };
    },
    created: function () {
        this.checkedCities1=JSON.parse(window.localStorage.getItem("checkedCities1"));  
       //this.checkedCities1=window.localStorage.getItem("checkedCities1");
       //  alert(this.checkedCities1);
    }  ,    
   methods: {
      dialogTableClose(){
         this.dialogTableVisible = false
         alert(this.currentRow.fname+":"+this.currentRow.fpath)
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        
      },     
     uploaded(){
       this.loading=true
       var j=0;
         var data = [];
         let _this=this;
       var params_json={userId:'15122922900',action:'uploaded',param1:'',param2:'',param3:'',param4:'',param5:''};
       this.$http.post('/KindergartenWeb/action/list.do',params_json).then(function (res) {
   
            _this.dataUploaded = res.data.rows
             _this.loading=false;
        }).catch(function (error) {
               alert(error);
        })        
         this.dialogTableVisible=true
     },
        submitUpload() {
        this.formupload.client="15122922900";
        this.formupload.name="liu";
         this.formupload.pwd="123hhh"; 
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },       
     onSelectChange(item){
          alert(item);
     },
     onChange(event){
        //JSON.parse(window.localStorage.getItem("subscribeList")); 
         //alert(JSON.stringify(this.checkedCities1));
         window.localStorage.setItem("checkedCities1",JSON.stringify(this.checkedCities1)); 
     }, 
 loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        alert(item.value+"\n"+item.address);
        console.log(item);
      },
      handleAvatarFailure(err, file){
           alert(err);
      } ,     
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        alert(JSON.stringify(res));
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

          //  var params = new URLSearchParams();
          //   params.append('client', '15122922900');
          //   params.append('name', 'liu');
          //   params.append('pwd', 'query_rk_pc');
 
       this.formupload.client="15122922900";
        this.formupload.name="liu";
         this.formupload.pwd="123hhh";

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }        
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
                                
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } 
    .upload-demo {
    width: 300px;
    height: 178px;
    display: block;
  } 
</style>
