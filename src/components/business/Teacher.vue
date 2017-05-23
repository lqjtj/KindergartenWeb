<template>
  <div>
 
 <div style="margin-top: 15px;width:60%;">
  <el-input placeholder="请输入内容" v-model="svalue">
    <el-select v-model="sname" slot="prepend" placeholder="请选择">
      <el-option label="角色名称" value="role"></el-option>
      <el-option label="备注" value="note"></el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="onPost"></el-button>
  </el-input>
</div>

     <el-button type="primary" @click="onPost" :loading="bloading">搜索</el-button>

<el-table
      @row-dblclick="onDbclick"
      @current-change="handleCurrentRowChange"
       highlight-current-row
      :data="tableData" 
       stripe  
       :default-sort = "{prop: 'date', order: 'descending'}" 
      style="width: 100%">
      <el-table-column
        prop="hkey"
        class-name="hkey"
        label-class-name="hkey"
        label=""
        width="30">
      </el-table-column>     
      <el-table-column
        sortable
        prop="role"
        label="role"
        width="180">
      </el-table-column>
      <!--<el-table-column
        prop="name"
        label="name"
        width="180">
      </el-table-column>-->
      <el-table-column
        prop="insertTime"
        label="insertTime"
        width="180">
      </el-table-column>
      <!--<el-table-column
        prop="tag"
        label="tag">
      </el-table-column>-->
      <el-table-column
        prop="note"
        label="note">
      </el-table-column>  
      <!--<el-table-column inline-template
                                         label="操作"
                                         width="250">
                            <span>
                                <el-button type="primary" size="mini" @click="removeUser(row)">删除</el-button>
                                <el-button type="primary" size="mini" @click="setCurrent(row)">编辑</el-button>
                            </span>
                        </el-table-column>-->
    
    </el-table>
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

     <!--<el-button type="primary" @click="onNew">新建</el-button>-->

     <el-button type="primary" @click="dialogCreateVisible = true">添加角色</el-button>

     <!-- <el-button type="primary" @click="open3">测试摁钮</el-button>
     <el-button type="primary" @click="dialogFormVisible = true">测试嵌套表单</el-button>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
      </el-dialog>-->

     <!--<el-button type="primary" @click="onUpdate">修改</el-button>-->
     <!--<el-button type="primary" @click="dialogUpdateVisible = true">修改</el-button>-->
     <el-button type="primary" @click="setCurrent()">修改</el-button>
      <el-button type="primary" @click="onDelete">删除</el-button>
<el-upload
  class="avatar-uploader"
  action="/api/file/upload2.do"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

  <el-dialog title="创建角色" v-model="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false"  >
        <el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
            <el-form-item label="角色名" prop="role">
                <el-input v-model="create.role"></el-input>
            </el-form-item>
            <!--<el-form-item label="密码" prop="password">
                <el-input v-model="create.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input v-model="create.checkpass" type="password"></el-input>
            </el-form-item>-->
            <el-form-item label="备注" prop="note">
                <el-input v-model="create.note"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCreateVisible = false">取 消</el-button>
            <el-button type="primary" :loading="createLoading" @click="createUser">确 定</el-button>
        </div>
    </el-dialog>

     <el-dialog title="修改角色" v-model="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false"  >
        <el-form id="#update" :model="update" :rules="rules" ref="update" label-width="100px">
            <el-form-item label="角色名" prop="role">
                <el-input v-model="update.role"></el-input>
            </el-form-item>
            <!--<el-form-item label="密码" prop="password">
                <el-input v-model="create.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input v-model="create.checkpass" type="password"></el-input>
            </el-form-item>-->
            <el-form-item label="备注" prop="note">
                <el-input v-model="update.note"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateVisible = false">取 消</el-button>
            <el-button type="primary" :loading="updateLoading" @click="updateUser">确 定</el-button>
        </div>
    </el-dialog>


  </div>
</template>

<script>
//测试用
var placeholders={"name":"请输入查找姓名","username":"请输入查找用户名","phone":"请输入查找电话"};
function getuuid(){
    var uid = [];
    var hexDigits = "0123456789abcdefghijklmnopqrst";
    for (var i = 0; i < 32; i++) {
        uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    uid[6] = "4";
    uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
    var uuid = uid.join("");
    return uuid;
}


 export default {
    data() {
       var validatePass = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.create.password) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };

      return {

        // url: 'url',
          users: [
          ],
          create: {
            //  id: '',
              role: '',
            //  tag: '',
            //  password: '',
            //  checkpass: '',
            //  client: '',
              note: '',
              is_active: true
          },
          currentId:'',
          update:{
              role: '',
          //    client: '',
          //    tag: '',
              note: '',
              is_active: true
          },
          rules: {
              role: [
                  { required: true, message: '请输入角色名', trigger: 'blur' },
                  { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              ],
              // client:[
              //     { required: true, pattern:/^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}
              // ],
              // tag: [
              //     { required: true, message: '请输入用户优先级', trigger: 'blur' },
              //     { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              // ],
              note: [
                  {  message: '请输入备注信息'},
                  { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              ]
              // ,
              // email: [
              //     { type: 'email', message: '邮箱格式不正确'}
              // ],
              // phone:[
              //     { pattern:/^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}
              // ]
          },
          updateRules: {
              role: [
                  { required: true, message: '请输入角色名', trigger: 'blur' },
                  { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              ],
              // client:[
              //     { required: true, pattern:/^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}
              // ],
              // tag: [
              //     { required: true, message: '请输入用户优先级', trigger: 'blur' },
              //     { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              // ],
              note: [
                  {  message: '请输入备注信息'},
                  { min: 2, max: 15, message: '长度在 2 到 15 个字符'}
              ]
          },
          filter: {
              per_page: 10, // 页大小
              page: 1, // 当前页
              name:'',
              username:'',
              phone:'',
              sorts:''
          },
          total_rows: 0,
          keywords: '', //搜索框的关键字内容
          select: 'username', //搜索框的搜索字段
          loading: true,
          selected: [], //已选择项
          dialogCreateVisible: false, //创建对话框的显示状态
          dialogUpdateVisible: false, //编辑对话框的显示状态
          createLoading: false,
          updateLoading: false,
          placeholder:placeholders["username"],
      
//上面测试用

        hkey:'',
        sname:'',
        svalue:'',

         currentPage: 1,
         total:0,
         pageSize:10,

         imageUrl: '',
         bloading:false,
 
         tableData: []       
       }
    },
  computed: {
        // 把日期换成 常见规格格式的字符串。
        getBirthday: function () {
          var m = new Date(this.birthday);
          return m.getFullYear() + '年' + m.getMonth() +'月'+ m.getDay()+'日';
        },
        getmutil:function () {
            if(this.x==''||this.y=='')
                   return '';
            else
                 return this.x*this.y;
        },
        getsum:function () {
          if(this.x==''||this.y=='')
                     return '';
            else
                   return this.x*1 + this.y*1;
        }        
      } ,   
    methods: {

      //修改用户进行操作
      updateUser(){
       // alert(this.update.name+this.update.client+this.update.tag+this.update.note);

          let _this=this
          var params_json={roleId:this.update.hkey,role:this.update.role,note:this.update.note};
          
        // alert(JSON.stringify(params_json));
         //  var params_json={userId:'15122922900',action:'getdepartment',param1:'ceshi',param2:'13700000000',param3:'1111',param4:'note',param5:''};
           this.$http.post('/KindergartenWeb/action/role/update.do',params_json,{withCredentials:true}).then(function (res) {
          // alert(JSON.stringify(res.data.rows));
          // alert(JSON.stringify(res.data));
          // _this.data2=res.data.rows;
         // alert("成功修改");
          _this.$message({
            showClose: true,
            message: '修改角色资料信息成功！',
            type: 'success'
        });
          //  this.$message.success('修改用户资料信息成功！');
           _this.dialogUpdateVisible=false;
           _this.updateLoading=false;   
           _this.onPost();       
        }).catch(function (error) {
            _this.$message.error(error);
        })     
      },

//测试用，新建用户进行操作
        createUser(){
          //alert(this.create.name+this.create.client+this.create.tag+this.create.note);

          let _this=this
          var params_json={role:this.create.role,note:this.create.note};
          
        // alert(JSON.stringify(params_json));
         //  var params_json={userId:'15122922900',action:'getdepartment',param1:'ceshi',param2:'13700000000',param3:'1111',param4:'note',param5:''};
           this.$http.post('/KindergartenWeb/action/role/add.do',params_json,{withCredentials:true}).then(function (res) {
          // alert(JSON.stringify(res.data.rows));
          // alert(JSON.stringify(res.data));
           _this.data2=res.data.rows;
           _this.$message({
            showClose: true,
            message: '新建角色成功！',
            type: 'success'
        });
        _this.dialogCreateVisible=false;
           _this.createLoading=false;   
           _this.onPost();
        }).catch(function (error) {
            _this.$message.error(error);
        })     
          // 主动校验
          // this.$refs.create.validate((valid) => {
          //     if (valid) {
          //         this.create.id=getuuid();
          //         this.createLoading=true;
          //         var resource = this.$resource(this.url);
          //         resource.save(this.create)
          //             .then((response) => {
          //             this.$message.success('创建用户成功！');
          //             alert(this.name+this.email+this.pass);
          //             this.dialogCreateVisible=false;
          //             this.createLoading=false;
          //             this.reset();
          //             this.getUsers();
          //     })
          //     .catch((response) => {
          //             var data=response.data;
          //             if(data instanceof Array){
          //                 this.$message.error(data[0]["message"]);
          //             }
          //             else if(data instanceof Object){
          //                 this.$message.error(data["message"]);
          //             }
          //             this.createLoading=false;
          //         });
          //     }
          //     else {
          //     return false;
          //     }
          // });
       },


       handleCurrentRowChange(val) {
        this.currentRow = val;
        //alert(val.hkey);
      },
     onDbclick(row, event){
             alert(row.hkey);
     },      
     handleSizeChange(val) {
        this.pageSize=val;
        console.log(`每页 ${val} 条`);
         this.onPost();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
         this.onPost();
      },      
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        alert(res);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },      
      onPost() {
        this.bloading=true
        var data = []
        let url = 'table.json'
          let _this = this
        //  var wherex="1=1";

        //  alert(this.svalue+this.sname);
          // if(where=="select"){
          //   wherwx=" "+this.svalue+" like '%"+this.sname+"%'"
          // }

       var params = new URLSearchParams();
            params.append('userId', '15122922900');
            params.append('action', 'query_rk_pc');
            params.append('param1', '1=1');
            params.append('param2', '');
            params.append('param3', '');
            params.append('param4', '');
            params.append('param5', '');
            
            var scondition='';
            if(_this.svalue!=''&&_this.sname!=''){
               scondition= _this.sname+" like '%"+_this.svalue+"%'";
            }
         //   alert(scondition);
       var params_json={userId:'15122922900',action:'user_list',param1:scondition,param2:this.pageSize.toString(),param3:this.currentPage.toString(),param4:'',param5:''};

         this.$http.post('/KindergartenWeb/action/query.do',params_json,{withCredentials:false}).then(function (res) {
          //  alert(JSON.stringify(res))
            for (let i = 0; i < res.data.rows.length; i++) {
                var obj = {}
                obj.note = res.data.rows[i].note
                obj.insertTime = res.data.rows[i].insertTime
                obj.role = res.data.rows[i].role
                // obj.client = res.data.rows[i].client
                // obj.tag=res.data.rows[i].tag
                obj.hkey=res.data.rows[i].hkey
                data[i] = obj
            }
            _this.total=parseInt(res.data.total.split('#')[0])
            _this.tableData = data
            _this.bloading=false
        }).catch(function (error) {

        })
      },
      onGet() {
        console.log('submit!');
        this.$http.post('/api/login.jsp', {
            params: {
            s_phoneNum: '15122922900',
            s_userPassword:'123'
            }
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
      },
       onNew() {
            
           //alert("新建");
      }, 
      // open3() {
      //   this.$prompt('请输入邮箱', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      //     inputErrorMessage: '邮箱格式不正确'
      //   }).then(({ value }) => {
      //     this.$message({
      //       type: 'success',
      //       message: '你的邮箱是: ' + value
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消输入'
      //     });       
      //   });
      // },

      setCurrent(){
          this.update.hkey=this.currentRow.hkey;
          this.update.role=this.currentRow.role;
          this.update.note=this.currentRow.note;
          this.update.is_active=this.currentRow.is_active;
          this.dialogUpdateVisible=true;
      },


       onUpdate() {
           alert(this.currentRow.hkey);
        //     let _this=this
        //   var params_json={name:this.create.name,client:this.create.client,tag:this.create.tag,note:this.create.note};
          
        //  alert(JSON.stringify(params_json));
        //  //  var params_json={userId:'15122922900',action:'getdepartment',param1:'ceshi',param2:'13700000000',param3:'1111',param4:'note',param5:''};
        //    this.$http.post('/KindergartenWeb/action/user/add.do',params_json,{withCredentials:true}).then(function (res) {
        //    alert(JSON.stringify(res.data.rows));
        //    alert(JSON.stringify(res.data));
        //    _this.data2=res.data.rows;
        // }).catch(function (error) {

        // })     
      },  

       onDelete() {
          let _this=this
          var params_json={key:this.currentRow.hkey};
          
        // alert(JSON.stringify(params_json));
         //  var params_json={userId:'15122922900',action:'getdepartment',param1:'ceshi',param2:'13700000000',param3:'1111',param4:'note',param5:''};
           this.$http.post('/KindergartenWeb/action/role/delete.do',params_json,{withCredentials:true}).then(function (res) {
          // alert(JSON.stringify(res.data.rows));
          // alert(JSON.stringify(res.data));
           _this.data2=res.data.rows;
           _this.$message({
            showClose: true,
            message: '删除角色成功！',
            type: 'success'
        });  
           _this.onPost('1=1');
        }).catch(function (error) {
            _this.$message.error(error);
        })     
      },                      
    },
 created: function () {
        this.onPost();
    }    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .active {
    background-color: #ccc;
  }
  .text-danger{
    background-color: #F00;
  }

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
  .ckey{
    display: none;
  }
</style>
