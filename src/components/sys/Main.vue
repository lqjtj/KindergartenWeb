<template>
  <div id="divmain">
  <div id="head" class="head">
      <Top></Top>
  </div>
      <div id="left" class="left">
          <Left></Left>
    </div>
   <div id="right" class="right">
         <router-view></router-view>
   </div>
    <div id="bottom" class="bottom">
          <Bottom></Bottom>
   </div>   

  </div>
</template>

<script>
import Top from './Top'
import Bottom from './Bottom'
import Left from './Left'

export default {
  name: 'app',
   data () {
      return {

      };
   },
 components: {'Top':Top,'Bottom':Bottom,'Left':Left}     
}
</script>

<style>

app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  margin-top: 60px;
}
.head{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: large;
    height: 10%;
    background:cyan;
}

.left{
    float: left; 
    width: 15%;  
     overflow:scroll;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: large;
     height: 80%;
     background:silver
}
.right{
    float: left;
    width: 85%; 
     height: 75%;
      overflow:scroll;
    
}
.bottom{
clear:both;
 height: 10%;
 background:olive;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: large;
}
#divmain{
    width:100%;
    height: 100%;
}
</style>
