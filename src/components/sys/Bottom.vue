<template>
  <div>
    {{title}}
  </div>
</template>

<script>
 export default {
    data() {
      return {
         title: 'Bottom',
       }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
