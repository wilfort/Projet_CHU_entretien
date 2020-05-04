<template>
  <div>
    <b-navbar>
       <navBar>
      </navBar>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>
          <h1>{{$listeData.mois[$listeData.dateJ.getMonth()]}} {{$listeData.dateJ.getFullYear()}}</h1>
        </b-nav-text>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :href='"/#/AgendaM/"+hopital' class="navColRed navColBR"><span class="navColText">Mois</span></b-nav-item>
        <b-nav-item :href='"/#/AgendaS/"+hopital' class="navColRed "><span class="navColText">Semaine</span></b-nav-item>
        <b-nav-item :href='"/#/Agenda/"+hopital' class="navColRed navColBL"><span class="navColText">Jour</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="agendaM">
      <div class="center grid">
        <b-table-simple responsive bordered>
          <b-thead>
            <b-tr>
              <b-th style="width:5%;">
                Sem.
              </b-th>
              <b-th style="width:19%; text-align: center;">
                Lundi
              </b-th>
              <b-th style="width:19%; text-align: center;">
                Mardi
              </b-th>
              <b-th style="width:19%; text-align: center;">
                Mercredi
              </b-th>
              <b-th style="width:19%; text-align: center;">
                Jeudi
              </b-th>
              <b-th style="width:19%; text-align: center;">
                Vendredi
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for='semaine in this.verCalendir()' :key='semaine.id' style="height:150px;">
              <b-td style="width:5%;">{{verSemaine(semaine[0])}}</b-td>
              <b-td v-for='day in semaine' :key='day.id' style="width:19%;">
                <div :style="colorDay(day.getMonth(), $listeData.dateJ.getMonth())">{{day.getDate()}}</div>
                <div v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital==hopital && !entry.annule && day.toLocaleDateString()==entry.date">
                  <b-badge :id="semaine.id" :variant="verUrgent(entry['urgent'])" style="width: 100%; text-align: justify;"
                  v-b-tooltip.hover :title='verMessage(entry, patientList[entry.patient])' >
                    <div>
                      {{entry.heure}} {{patientList[entry.patient].Nom}}, {{patientList[entry.patient].Prenom}} <b-badge v-if="patientList[entry.patient].Diabete!='n'" variant="colorH">Diabete</b-badge></div>
                  </b-badge>
                </div>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>

      </div>
    </div>
  </div>
</template>

<script>
import * as fonction from '../js/fonction'
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      hopital: '',
      patientList: [],
      rdvList: []
    }
  },
  firebase () {
    return {
      patientList: this.$db.ref('Patient'),
      rdvList: this.$db.ref('Rdv')
    }
  },
  mounted () {
    this.hopital = this.$route.params.hopital
  },
  methods: {
    firstDay () { // recupere le premier jour du mois de l'annee
      let date = new Date()
      let dateP = new Date(date.getFullYear(), date.getMonth(), 1)
      return dateP
    },
    lastDay () { // recupere le dernier jour du mois de l'annee
      let val = new Date()
      let dateD = new Date(val.getFullYear(), val.getMonth() + 1, 0)
      return dateD
    },
    colorDay (val1, val2) {
      if (val1 === val2) {
        return 'font-weight:bold; color:black; text-align: right;'
      } else {
        return 'color:gray; text-align: right;'
      }
    },
    verUrgent: fonction.verUrgent,
    verCalendir () { // constrution de l'agenda
      let preJour = this.firstDay()
      let derJour = this.lastDay()
      let calendir = []
      let objetD1 = []
      let objetD2 = []
      let test = 0
      if (preJour.getDay() > 1) {
        test = preJour.getDay() - 1
      } else if (preJour.getDay() === 0) {
        test = 7 - 1
      }
      if (test > 0) {
        for (let index = test; index > 0; index--) {
          let dateP = new Date(preJour.getFullYear(), preJour.getMonth(), 1 - index)
          calendir.push(dateP)
        }
      }
      for (let index = 0; index < derJour.getDate(); index++) {
        let dateP = new Date(preJour.getFullYear(), preJour.getMonth(), 1 + index)
        if (dateP.getDay() > 0 && dateP.getDay() < 6) {
          calendir.push(dateP)
        }
      }
      for (let index = derJour.getDay(); index < 5; index++) {
        let val = 5 - index
        let dateP = new Date(preJour.getFullYear(), preJour.getMonth() + 1, val)
        if (index > 0) {
          calendir.push(dateP)
        }
      }
      for (let index = 0; index < calendir.length; index++) {
        objetD1.push(calendir[index])
        if (index % 5 === 4) {
          objetD2.push(objetD1)
          objetD1 = []
        }
      }
      return objetD2
    },
    verSemaine (uneDate) { // fonction pour recuperer numero de la semaine de l'annee
      let d = new Date(uneDate)
      let DoW = d.getDay()
      d.setDate(d.getDate() - (DoW + 6) % 7 + 3)
      var ms = d.valueOf()
      d.setMonth(0)
      d.setDate(4)
      return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1
    },
    verMessage: fonction.verMessage
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#agendaM {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.colorH{color:#563d7c}

</style>
