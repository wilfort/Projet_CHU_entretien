<template>
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
          to="/test"
        >
          GHDC
        </router-link>
      </li>
      <li>
        <router-link
          to ="/test"
        >
          CNDG
        </router-link>
      </li>
    </ul>
  </div>
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
