<template>
  <div>
 
  </div>
</template>

<script>
 export default {
    data() {
      return {
       
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
            //window.localStorage.setItem("pwd",this.pwd);
            _this.$router.push("/main");
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

</style>
