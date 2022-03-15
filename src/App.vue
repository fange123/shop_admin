<template>
  <div id="app">
    <Login/>

  </div>
</template>
<script>
import Login from './components/Login.vue';
  export default {
    components:{
      Login
    }
  };
</script>

<style lang="less">
* {
  margin:0;
  padding:0;
}
html,body,#app {
  width:100%;
  height:100%;
}


</style>
