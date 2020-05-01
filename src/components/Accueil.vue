<template>
<div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item href="/#/" class="navColRed navColBR"><span class="navColText">Accueil</span></b-nav-item>
        <b-nav-item href="/#/AgendaCHU" class="navColRed "><span class="navColText">CHU</span></b-nav-item>
        <b-nav-item href="/#/AgendaGHDC" class="navColRed "><span class="navColText">GHDC</span></b-nav-item>
        <b-nav-item href="/#/AgendaCNDG" class="navColRed "><span class="navColText">CNDG</span></b-nav-item>
        <b-nav-item href="/#/Recherche" class="navColRed "><span class="navColText">Recherche RDV</span></b-nav-item>
        <b-nav-item href="/#/NewRdv" class="navColRed navColBL"><span class="navColText">Nouveau RDV</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  <div class="Accueil">
    <h1>{{ msg }}</h1>
    <h2>Sélétion votre hôpital</h2>
    <ul>
      <li>
        <router-link
          to = "/AgendaCHU"
        >
          CHU de Charleroi
        </router-link>
      </li>
      <li>
        <router-link
          to="/AgendaGHDC"
        >
          GHDC
        </router-link>
      </li>
      <li>
        <router-link
          to ="/AgendaCNDG"
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  /* margin: 0 10px; */
}
a {
  color: #42b983;
}
</style>
