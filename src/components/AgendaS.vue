<template>
  <div>
    <b-navbar>
      <navBar>
      </navBar>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>
          <h1>{{verSemmaine($listeData.dateJ)[0].toLocaleDateString()}} - {{verSemmaine($listeData.dateJ)[4].toLocaleDateString()}}</h1>
        </b-nav-text>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :href='"/#/AgendaM/"+hopital' class="navColRed navColBR"><span class="navColText">Mois</span></b-nav-item>
        <b-nav-item :href='"/#/AgendaS/"+hopital' class="navColRed "><span class="navColText">Semaine</span></b-nav-item>
        <b-nav-item :href='"/#/Agenda/"+hopital' class="navColRed navColBL"><span class="navColText">Jour</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="agendaS">
      <div class="center grid">
        <b-table-simple responsive bordered>
          <b-thead>
            <b-tr>
              <b-th style="width:20%; text-align: center;">
                Lundi
              </b-th>
              <b-th style="width:20%; text-align: center;">
                Mardi
              </b-th>
              <b-th style="width:20%; text-align: center;">
                Mercredi
              </b-th>
              <b-th style="width:20%; text-align: center;">
                Jeudi
              </b-th>
              <b-th style="width:20%; text-align: center;">
                Vendredi
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td v-for='day in verSemmaine($listeData.dateJ)' :key='day.id'>
                <div v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital==hopital && !entry.annule && day.toLocaleDateString()==entry.date">
                  <b-badge :id="$listeData.semaine.id" :variant="verUrgent(entry['urgent'])" style="width: 100%; text-align: justify;"
                  v-b-tooltip.hover :title='verMessage(entry, patientList[entry.patient])' >
                    <div>
                      {{entry.heure}} {{patientList[entry.patient]['Nom']}}, {{patientList[entry.patient]['Prenom']}} <b-badge v-if="patientList[entry['patient']]['Diabete']!='n'" variant="colorH">Diabete</b-badge></div>
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
import * as fonction from '../js/fonction' // recupere les fonction
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
    verUrgent: fonction.verUrgent,
    verSemmaine (x) { // recupere les date de la semaine
      let calendir = []
      let test = 0
      if (x.getDay() > 0) {
        test = x.getDay() - 1
      } else if (x.getDay() === 0) {
        test = 7 - 1
      }
      if (test > 0) {
        for (let index = test; index > 0; index--) {
          let dateP = new Date(x.getFullYear(), x.getMonth(), x.getDate() - index)
          if ((test < 6) || (test === 6 && index !== 1)) {
            calendir.push(dateP)
          }
        }
      }
      test = 5 - test
      if (test < 0 || test === 0) {
        test = 0
      } else {
        for (let index = 0; index < test; index++) {
          let dateP = new Date(x.getFullYear(), x.getMonth(), x.getDate() + index)
          calendir.push(dateP)
        }
      }

      if (calendir.length < 5) {
        test = 5 - calendir.length
        for (let index = 0; index < test; index++) {
          let dateP = new Date(x.getFullYear(), x.getMonth() + 1, 1 + index)
          calendir.push(dateP)
        }
      }
      return calendir
    },
    verMessage: fonction.verMessage
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

#agendaS{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top:60px;
}
.colorH{color:#563d7c}

</style>
