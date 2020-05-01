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
      <b-navbar-nav class="ml-auto">
        <b-nav-text>
          <h1>{{verSemmaine(dateJ)[0].toLocaleDateString()}} - {{verSemmaine(dateJ)[4].toLocaleDateString()}}</h1>
        </b-nav-text>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/#/AgendaMGHDC" class="navColRed navColBR"><span class="navColText">Mois</span></b-nav-item>
        <b-nav-item href="#/AgendaSGHDC" class="navColRed "><span class="navColText">Semaine</span></b-nav-item>
        <b-nav-item href="/#/AgendaGHDC" class="navColRed navColBL"><span class="navColText">Jour</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="agendaSChu">
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
              <b-td v-for='day in verSemmaine(dateJ)' :key='day.id'>
                <div v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital=='GHDC' && !entry.annule && day.toLocaleDateString()==entry.date">
                  <b-badge :id="semaine.id" :variant="verUrgent(entry['urgent'])" style="width: 100%; text-align: justify;"
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
export default {
  data () {
    return {
      patientList: [],
      rdvList: [],
      dateJ: new Date(),
      semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      examenM: [// autre type examen medicale
        'autre',
        'radio',
        'scanner',
        'IRM'// ,
        // 'autre + radio',
        // 'autre + scanner',
        // 'autre + IRM',
        // 'radio + scanner',
        // 'radio + IRM',
        // 'scanner + IRM',
        // 'autre + radio + scanner',
        // 'autre + radio + IRM',
        // 'autre + scanner + IRM',
        // 'radio + scanner + IRM',
        // 'autre + radio + scanner + IRM'
      ],
      heureRDV: [// plage horaire des Rdv
        '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:30'],
      hopital: ['CHU', 'CNDG', 'GHDC']
    }
  },
  firebase () {
    return {
      patientList: this.$db.ref('Patient'),
      rdvList: this.$db.ref('Rdv')
    }
  },
  methods: {
    colorDay (val1, val2) {
      if (val1 === val2) {
        return 'font-weight:bold; color:black; text-align: right;'
      } else {
        return 'color:gray; text-align: right;'
      }
    },
    verUrgent (x) {
      if (x === 'y') {
        return 'warning'
      } else {
        return 'primary'
      }
    },
    verSemmaine (x) {
      let calendir = []
      let test = 0
      if (x.getDay() > 1) {
        test = x.getDay() - 1
      } else if (x.getDay() === 0) {
        test = 7 - 1
      }
      if (test > 0) {
        for (let index = test; index > 0; index--) {
          let dateP = new Date(x.getFullYear(), x.getMonth(), x.getDate() - index)
          calendir.push(dateP)
        }
      }
      test = 5 - x.getDay()
      if (test < 0) {
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
      console.log(calendir)
      return calendir
    },
    verMessage (rdv, patient) {
      let verMessage = 'Rdv du patient est le ' + rdv.date + ', l\'heure est à ' + rdv.heure + '.\n'
      if (rdv.urgent !== 'n') {
        verMessage += 'C\'est une URGENT.\n'
      }
      verMessage += 'C\'est un examen de type : ' + rdv.examen + ', à l\'hopital du ' + rdv.hopital + '.\n'
      verMessage += 'Nom du Patient : ' + patient.Nom + '.\n'
      verMessage += 'Prénom du Patient : ' + patient.Prenom + '.\n'
      if (patient.Sexe === 'M') {
        verMessage += 'C\'est un Homme.\n'
      } else {
        verMessage += 'C\'est un Femme.\n'
      }
      verMessage += 'Née le ' + patient.DateN
      if (patient.Diabete !== 'n') {
        verMessage += 'Personne diabétique de \n' + patient.Diabete + '.\n'
      }
      verMessage += 'Poids : ' + patient.Poids + ' Kg.\n'
      verMessage += 'Taille : ' + patient.Taille + ' cm.\n'
      verMessage += 'NISS : ' + patient.Niss + '.\n'
      verMessage += 'Téléphone : ' + patient.Telephone + '.\n'
      return verMessage
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

#agendaSChu{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top:20px;
}
.colorH{color:#563d7c}

</style>
