<template>
  <div id="divlog">
        <el-form   label-width="50px">
          <el-form-item label="帐号">
            <el-input  v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input  v-model="pwd" ></el-input>
          </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>  
        </el-form>
  </div>
</template>

<script>
 export default {
    data() {
      return {
           name: '',
           pwd: ''       
      }
    },
    methods: {
      onSubmit() {
        let _this=this;

       var params = new URLSearchParams();
            params.append('client', this.name);
            params.append('pwd', this.pwd);

         this.$http.post('/KindergartenWeb/action/login.do',params).then(function (res) {
            var obj = {}
            for (let i = 0; i < res.data.rows.length; i++) {
                obj.msg = res.data.total
                obj.client = res.data.rows[i].client
                obj.name = res.data.rows[i].name
            }
            alert(JSON.stringify(obj));
                     window.localStorage.setItem("name",obj.name);
                     window.localStorage.setItem("client",obj.client);
            //window.localStorage.setItem("pwd",this.pwd);
              _this.$router.push("/main");
            // _this.$router.push("/tabletest");
         })
 

      },
     onReset() {
        this.name="";
        this.pwd="";
      }      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#divlog {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  padding: 50px 30px 0px;
  width:20%;
  margin:50px auto ; 
  height:200px;
  border:1px solid #cccccc;
}
</style>
