<template>
  <div id="agendaChu">
    <h1><i class="fas fa-neuter rotate-315"></i> Recherche de Rendez-vous</h1>
    <div class="row">
      <span style="width: 200px;padding: 0px 20px">
       Plage du rendez-vous
      </span>
        <b-form-input v-model="dateDebutR" type="date" style="width: 200px"></b-form-input>
        <span style="padding: 0px 20px"> à </span>
        <b-form-input v-model="dateFinR" type="date" style="width: 200px"></b-form-input>
    </div>
    <div class="row">
      <span style="width: 200px;padding: 0px 20px">
        Nom du patient
      </span>
        <b-form-select v-model="patientR" style="width: 440px">
          <b-form-select-option :value='null'>Choisissez le Patient</b-form-select-option>
          <b-form-select-option v-for="elemP in patientList" :key='elemP.id' :value='elemP.id'>{{elemP.Nom}} {{elemP.Prenom}}</b-form-select-option>
        </b-form-select>
    </div>
    <div class="row">
      <span style="width: 200px;padding: 0px 20px">
       Date de naissance du patient
      </span>
        <b-form-input v-model="dateNPR" type="date" style="width: 440px"></b-form-input>
    </div>
    <div class="row">
      <span style="width: 200px;padding: 0px 20px">
        Rendez-vous annulés
      </span>
        <b-form-checkbox v-model="checkedA" name="check-button" switch>
          Afficher les rendez-vous annulés
        </b-form-checkbox>
    </div>
    <!-- <b-button
                  only-arrows
                  icon
                  variant="success"
                  id="show-btn" @click="showModal(entry)"
                > -->
    <b-button only-arrows icon variant="danger" @click="checkedRecherche=true"><i class="fas fa-neuter rotate-315"></i> Recherche</b-button>
    <div class="center grid" v-show="checkedRecherche">
        <b-row>
          <b-col cols="3">
            <b-row>
              <b-col cols="2">
                RDV
              </b-col>
              <b-col cols="8">
                Nom, prénom
              </b-col>
              <b-col cols="2">
                Sexe
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="7">
                Date de naissance
              </b-col>
              <b-col cols="3">
                Diabète
              </b-col>
              <b-col cols="2">
                Poids
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="2">
                Taille
              </b-col>
              <b-col cols="6">
                IBM
              </b-col>
              <b-col cols="4">
                Examen
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="5">
                NISS
              </b-col>
              <b-col cols="5">
                Téléphane
              </b-col>
              <b-col cols="2">
              <i class="far fa-edit"></i>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row v-for='entry in rechercheRdv()' :key='entry.id'>
          <b-col cols="3">
            <b-row>
              <b-col cols="2">
                {{entry['heure']}}
              </b-col>
              <b-col cols="8">
                {{patientList[entry['patient']]['Nom']}}, {{patientList[entry['patient']]['Prenom']}}
                <span class="colorH" v-show="entry.examen=='scanner'"><i class="fas fa-x-ray"></i></span>
                <span class="colorH" v-show="entry.examen=='radio'"><i class="fas fa-biohazard"></i></span>
                <span class="colorH" v-show="entry.examen=='IRM'"><i class="fas fa-brain"></i></span>
                <b-badge v-show="entry['urgent']=='y'" pill variant="colorU">URGENT</b-badge>
              </b-col>
              <b-col cols="2">
                <span v-if="patientList[entry['patient']]['Sexe']==='M'">M</span><span v-if="patientList[entry['patient']]['Sexe']==='F'">F</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="7">
                {{patientList[entry['patient']]['DateN']}}
              </b-col>
              <b-col cols="3">
                <span v-if="patientList[entry['patient']]['Diabete']!='n'"><b-badge variant="colorH">{{patientList[entry['patient']]['Diabete']}}</b-badge></span>
              </b-col>
              <b-col cols="2">
                {{patientList[entry['patient']]['Poids']}} kg
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="2">
                {{patientList[entry['patient']]['Taille']}} cm
              </b-col>
              <b-col cols="6">
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))==0">?</span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>0&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<18.5"><b-badge pill variant="colorH">Poids insuffisant</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=18.5&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<25">Poids normal</span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=25&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<30"><b-badge pill variant="colorH">Excès pondéral, surpoids</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=30&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<40"><b-badge pill variant="colorH">Obésité</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=40">Obésité morbide</span>
              </b-col>
              <b-col cols="4">
                {{entry['examen']}}
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="3">
            <b-row>
              <b-col cols="5">
                {{patientList[entry['patient']]['Niss']}}
              </b-col>
              <b-col cols="5">
                {{patientList[entry['patient']]['Telephone']}}
              </b-col>
              <b-col cols="2">
                <b-button
                  only-arrows
                  icon
                  variant="success"
                  id="show-btn" @click="showModal(entry)"
                >
                  <i class="far fa-edit"></i>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
    </div>

    <div id="modal">
      <b-modal ref="my-modal" hide-footer hide-header title="Using Component Methods">
        <div>
          <b-row>
            <b-col>
              <h3>Rdv du patient : {{rdvModalN}}</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">Date : </b-col>
            <b-col cols="6">
              <b-input-group>
                <b-form-input
                  v-model="rdvModal['date']"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                ></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker v-model="rdvModal['date']" :date-disabled-fn="dateDisabled" locale="fr"
                  button-only
                  right></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">Examen : </b-col>
            <b-col cols="6">
              <b-form-select v-model="rdvModal['examen']">
                <b-form-select-option v-for="elemEM in examenM" :key='elemEM.id' :value='elemEM'>{{elemEM}}</b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">Heure : </b-col>
            <b-col cols="6">
              <b-form-select v-model="rdvModal['heure']">
                <b-form-select-option v-for="elemRDV in heureRDV" :key='elemRDV.id' :value='elemRDV'>{{elemRDV}}</b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">l'Hôpital : </b-col>
            <b-col cols="6">
              <b-form-select v-model="rdvModal['hopital']">
                <b-form-select-option v-for="elemH in hopital" :key='elemH.id' :value='elemH'>{{elemH}}</b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">Urgent : </b-col>
            <b-col cols="6">
              <b-form-select v-model="rdvModal['urgent']">
                <b-form-select-option value="n">Non</b-form-select-option>
                <b-form-select-option value="y">Yes</b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>
        </div>
        <div class="d-block text-center">
          <h3>Hello From My Modal!</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      rdvModalId: '',
      rdvModalN: '',
      rdvModal: {},
      keyM: '',
      checkedA: false,
      checkedRecherche: false,
      patientR: null,
      rechercheRDV: [],
      dateDebutR: null,
      dateFinR: null,
      dateNPR: null,
      patientList: [],
      rdvRecherche: [],
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
    rechercheRdv () {
      let rdvRecherche = []
      let dateDR = (new Date(this.dateDebutR)).toLocaleDateString()
      let dateFR = (new Date(this.dateFinR)).toLocaleDateString()
      let dateN = (new Date(this.dateNPR)).toLocaleDateString()
      let testValDDR = dateDR.split('/')
      let valDateDR = '' + testValDDR[2] + '' + testValDDR[1] + '' + testValDDR[0]
      let testValDFR = dateFR.split('/')
      let valDateFR = '' + testValDFR[2] + '' + testValDFR[1] + '' + testValDFR[0]
      let testValR = null
      let valDateR = null
      this.rdvList.forEach(element => {
        testValR = element.date.split('/')
        valDateR = '' + testValR[2] + '' + testValR[1] + '' + testValR[0]
        if (
          ((!element.annule && !this.checkedA) || this.checkedA) && (this.patientR === element.patient || this.patientR === null) && ((this.dateNPR === null || this.dateNPR === '') || (dateN === this.patientList[element.patient].DateN)) && (((this.dateDebutR === null || dateDR === 'Invalid Date') && (this.dateFinR === null || dateFR === 'Invalid Date')) || ((this.dateDebutR === null || dateDR === 'Invalid Date') && dateDR === element.date) || (valDateDR <= valDateR && valDateFR >= valDateR) || ((this.dateFinR === null || dateFR === 'Invalid Date') && dateFR === element.date))) {
          rdvRecherche.push(element)
        }
      })
      console.log(rdvRecherche)
      return rdvRecherche
    },
    dateDisabled (ymd, date) {
      let check = false
      const weekday = date.getDay()
      const day = date.getDate()
      const month = date.getMonth()
      if ((weekday === 0) || (weekday === 6) || (month === 0 && day === 1) || (month === 4 && day === 1) || (month === 6 && day === 21) || (month === 7 && day === 15) || (month === 10 && day === 1) || (month === 10 && day === 11) || (month === 11 && day === 25) || (month === 6 && day === 11) || (month === 10 && day === 2) || (month === 10 && day === 15)) {
        check = true
      }
      // Return `true` if the date should be disabled
      return check
    },
    showModal (x) {
      for (let index = 0; index < this.rdvList.length; index++) {
        if (x.id === this.rdvList[index].id) {
          this.keyM = index
        }
      }
      this.rdvModalN = this.patientList[x['patient']]['Nom'] + ' ' + this.patientList[x['patient']]['Prenom']
      this.rdvModal = x
      this.rdvModalId = x.id
      this.$refs['my-modal'].show()
    },
    hideModal () {
      let data = this.rdvModal
      let dateM = new Date(data['date'])
      let mdateM = '' + dateM.toLocaleDateString()
      if (mdateM === 'Invalid Date') {
        mdateM = data['date']
      }
      data.date = mdateM
      mdateM = mdateM.replace(/\//gi, '')
      let heureM = data['heure']
      heureM = heureM.replace(':', '')
      let childM = '' + data['hopital'] + '' + mdateM + '' + heureM + '' + data.patient
      data.id = childM
      if (childM === this.rdvModalId) {
        this.$firebaseRefs.rdvList.child(this.rdvModalId).update(data)
      } else {
        this.$firebaseRefs.rdvList.child(this.rdvModalId).update({'annule': true})
        this.$firebaseRefs.rdvList.child(childM).set(data)
      }
      setTimeout(() => {
        this.$refs['my-modal'].hide()
        this.rdvModal = {}
        this.rdvModalId = ''
        this.rdvModalN = ''
      }, 1)
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.rotate-315{
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
}
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
