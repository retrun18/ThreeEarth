<template>
  <div class="wraper"><div id="container"></div></div>
</template>
<script scoped>
  import TGE from "../assets/ThreeGISEngine/main"
  export default{
      data(){
          return{
              name:"test name",
          }
      },
    mounted(){
          TGE.InitGlobeScene("container");
    }
  }
</script>
<style lang="scss">
  .wraper{
    background-color: rgba(98, 107, 52, 0.51);
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  #container{
    width: 100%;
    height: 100%;
  }
  body{
    margin: 0;
  }
</style>
