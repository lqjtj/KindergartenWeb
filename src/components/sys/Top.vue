<template>
  <div class="head">
    {{title}}
  </div>
</template>

<script>
 export default {
    name:"Top",
    data() {
      return {
         title: 'this is a test vue.js',
       }
    },
     created: function () {
            if(window.localStorage.getItem("name")){
                this.title=window.localStorage.getItem("name");     
            }
            else{
                this.title="没有找到";
            }
    },
    methods: {
 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   head{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: large
   }
</style>
