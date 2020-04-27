<template>
  <div id="agendaChu">
    <div class="center grid">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
          Rendez-vous du {{semaine[dateJ.getDay()]}} {{dateJ.toLocaleDateString()}}
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
          <router-link
          to = "/NewRdv"
        >
          Prendre un rendez-vous
        </router-link>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-row>
          <vs-col w="3">
            <vs-col w="2">
              RDV
            </vs-col>
            <vs-col w="8">
              Nom, prénom
            </vs-col>
            <vs-col w="2">
              Sexe
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="7">
              Date de naissance
            </vs-col>
            <vs-col w="3">
              Diabète
            </vs-col>
            <vs-col w="2">
              Poids
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="3">
              Taille
            </vs-col>
            <vs-col w="4">
              IBM
            </vs-col>
            <vs-col w="5">
              Examen
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="5">
              NISS
            </vs-col>
            <vs-col w="5">
              Téléphane
            </vs-col>
            <vs-col w="2">
             <i class="far fa-edit"></i>
            </vs-col>
          </vs-col>
        </vs-row>
        <vs-row v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital=='CHU' && !entry.annule"><!-- v-show condition hopital, date et annulation -->
          <vs-col w="3">
            <vs-col w="2">
              {{entry['heure']}}
            </vs-col>
            <vs-col w="8">
              {{patientList[entry['patient']]['Nom']}}, {{patientList[entry['patient']]['Prenom']}}
              <span class="colorH" v-show="entry.examen=='scanner'"><i class="fas fa-x-ray"></i></span>
              <span class="colorH" v-show="entry.examen=='radio'"><i class="fas fa-biohazard"></i></span>
              <span class="colorH" v-show="entry.examen=='IRM'"><i class="fas fa-brain"></i></span>
              <b-badge v-show="entry['urgent']=='y'" pill variant="colorU">URGENT</b-badge>
            </vs-col>
            <vs-col w="2">
              <span v-if="patientList[entry['patient']]['Sexe']==='M'">M</span><span v-if="patientList[entry['patient']]['Sexe']==='F'">F</span>
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="7">
              {{patientList[entry['patient']]['DateN']}}
            </vs-col>
            <vs-col w="3">
              <span v-if="patientList[entry['patient']]['Diabete']!='n'"><b-badge variant="colorH">{{patientList[entry['patient']]['Diabete']}}</b-badge></span>
            </vs-col>
            <vs-col  v-if="patientList[entry['patient']]['Diabete']=='n'" offset=3 w="2">
              {{patientList[entry['patient']]['Poids']}} kg
            </vs-col>
            <vs-col v-if="patientList[entry['patient']]['Diabete']!='n'" w="2">
              {{patientList[entry['patient']]['Poids']}} kg
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="3">
              {{patientList[entry['patient']]['Taille']}} cm
            </vs-col>
            <vs-col w="4">
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))==0">?</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>0&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<18.5"><b-badge pill variant="colorH">Poids insuffisant</b-badge></span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=18.5&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<25">Poids normal</span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=25&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<30"><b-badge pill variant="colorH">Excès pondéral, surpoids</b-badge></span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=30&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<40"><b-badge pill variant="colorH">Obésité</b-badge></span>
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=40">Obésité morbide</span>
            </vs-col>
            <vs-col w="5">
              {{entry['examen']}}
            </vs-col>
          </vs-col>
          <vs-col w="3">
            <vs-col w="5">
              {{patientList[entry['patient']]['Niss']}}
            </vs-col>
            <vs-col w="5">
              {{patientList[entry['patient']]['Telephone']}}
            </vs-col>
            <vs-col w="2">
              <vs-button
                only-arrows
                icon
                color="rgb(0,222,0)"
              >
                <i class="far fa-edit"></i>
              </vs-button>
            </vs-col>
          </vs-col>
        </vs-row>
      </vs-row>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
#agendaChu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.colorH{color:#563d7c}
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
