<template>
  <div>
    <div>
      Rendez-vous du {{semaine[dateJ.getDay()]}} {{dateJ.toLocaleDateString()}}
      <router-link
          to = "/NewRdv"
        >
          Prendre un rendez-vous
        </router-link>
    </div>
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
            <td>
              {{entry['heure']}}
            </td>
            <td>
              {{patientList[entry['patient']]['Nom']}}, {{patientList[entry['patient']]['Prenom']}} <span></span> <span></span> <span></span><span v-if="entry['urgent']==='y'">URGENT</span>
            </td>
            <td>
              <span v-if="patientList[entry['patient']]['Sexe']==='M'">M</span><span v-if="patientList[entry['patient']]['Sexe']==='F'">F</span>
            </td>
            <td>
              {{patientList[entry['patient']]['DateN']}}
            </td>
            <td>
              <span v-if="patientList[entry['patient']]['Diabete']==!'n'">{{patientList[entry['patient']]['Diabete']}}</span>
            </td>
            <td>
              {{patientList[entry['patient']]['Poids']}} kg
            </td>
            <td>
              {{patientList[entry['patient']]['Taille']}}
            </td>
            <td>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))==0">?</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>0&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<18.5">Poids insuffisant</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=18.5&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<25">Poids normal</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=25&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<30">Excès pondéral, surpoids</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=30&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<40">Obésité</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=40">Obésité morbide</span>
            </td>
            <td>
              {{entry['examen']}}
            </td>
            <td>
              {{patientList[entry['patient']]['Niss']}}
            </td>
            <td>
              {{patientList[entry['patient']]['Telephone']}}
            </td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>

export default {
  data () {
    return {
      keyList: ['RDV', 'Nom, prénom', 'Sexe', 'Date de naissance', 'Diabète', 'Poids', 'Taille', 'IBM', 'Examen', 'NISS', 'Téléphane'],
      patientList: [],
      rdvList: [],
      dateJ: new Date(),
      semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
    }
  },
  firebase () {
    return {
      patientList: this.$db.ref('Patient'),
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
