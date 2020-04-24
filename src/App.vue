<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
