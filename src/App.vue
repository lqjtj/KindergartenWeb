<template>
   <div id="divindex">
       <router-view></router-view>    
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
 
    }
  }
</script>

<style>
#divindex{
    width:100%;
    height: 100%;
}
</style>
