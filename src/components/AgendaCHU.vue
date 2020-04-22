<template>
  <div>
    <table>
        <thead>
          <tr>
            <th v-for='key in keyList' :key='key.id'>
              {{key}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='entry in rdvList' :key='entry.id'>
            <td v-for='key in keyList' :key='key.id'>
            </td>
            <td>
              {{entry['heure']}}
               {{patienList[entry['patien']]}}
            </td>
            <td>
              {{entry['heure']}}
            </td>
            <td>
              {{patienList[entry['patien']]['Nom']}}.', '.{{patienList[entry['patien']]['Prenom']}} <span></span> <span></span> <span></span><span v-if="entry['urgent']==='y'">URGENT</span>
            </td>
            <td>
              <span v-if="patienList[entry['patien']]['Sexe']==='M'">M</span><span v-if="patienList[entry['patien']]['Sexe']==='F'">F</span>
            </td>
            <td>
              {{patienList[entry['patien']]['DateN']}}
            </td>
            <td>
              <span v-if="patienList[entry['patien']]['Diabete']==!'n'">{{patienList[entry['patien']]['Diabete']}}</span>
            </td>
            <td>
              {{patienList[entry['patien']]['Poids']}} kg
            </td>
            <td>
              {{patienList[entry['patien']]['Taille']}} cm
            </td>
          </tr>
        </tbody>
      </table>
    <div >{{rdvList[0]}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyList: ['RDV', 'Nom, prénom', 'Sexe', 'Date de naissance', 'Diabète', 'Poids', 'Taille', 'IBM', 'Examen', 'NISS', 'Téléphane'],
      patienList: [],
      rdvList: []
    }
  },
  firebase () {
    return {
      patienList: this.$db.ref('Patient'),
      rdvList: this.$db.ref('Rdv')
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
