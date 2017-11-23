<template>
  <div class="wraper">this is test home page</div>
</template>
<script scoped>
  export default{
      data(){
          return{
              name:"test name",
          }
      },
    mounted(){
          alert(this.name)
    }
  }
</script>
<style lang="scss">
  .wraper{
    background-color:red;
  }
  body{
    margin: 0;
  }
</style>
