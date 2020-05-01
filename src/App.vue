<template>
  <div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }
}

</script>

<style>
.badge-colorH{color: #f8f9fa;background-color:#563d7c}
.badge-colorU{color: #f8f9fa;background-color:#ffc107}
.navColRed{background-color:red; border: white 1px solid;}
.navColBR{border-radius: 25px 0px 0px 25px;}
.navColBL{border-radius: 0px 25px 25px 0px;}
.navColText{color: white;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 5%;
}
/* a.page-link {
    color: red!important;
} */
  .page-link {
    color: red;
    border: 1px solid #dbdbdb;
}
 .page-item.active .page-link {
    color: white;
    background-color: red;
    border-color:red;
}
</style>
