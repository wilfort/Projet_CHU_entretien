<template>
<div>
  <div id="Accueil">
    <h1>{{ msg }}</h1>
    <h2>Sélétion votre hôpital</h2>
    <ul class="hopitalUl">
      <li class="hopitalLi">
        <router-link
          to = "/Agenda/CHU"
        >
          CHU de Charleroi
        </router-link>
      </li>
      <li class="hopitalLi">
        <router-link
          to="/Agenda/GHDC"
        >
          GHDC
        </router-link>
      </li>
      <li class="hopitalLi">
        <router-link
          to ="/Agenda/CNDG"
        >
          CNDG
        </router-link>
      </li>
    </ul>
  </div></div>
</template>

<script>
export default {
  name: 'Accueil',
  data () {
    return {
      msg: "Beinvenu sur l'agenda de l'hôpital"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Accueil {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0 ;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.hopitalUl{margin-top: 40px;}
.hopitalLi{
  margin: 0 40px;
}
</style>
