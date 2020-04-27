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
        <vs-row v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital=='CHU' && !entry.annule && dateJ.toLocaleDateString()==entry.date"><!-- v-show condition hopital, date et annulation -->
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
              <b-button
                only-arrows
                icon
                variant="success"
                id="show-btn" @click="showModal(entry)"
              >
                <i class="far fa-edit"></i>
              </b-button>
            </vs-col>
          </vs-col>
        </vs-row>
      </vs-row>
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
      this.rdvModalN = this.patientList[x['patient']]['Nom'] + ' ' + this.patientList[x['patient']]['Prenom']
      this.rdvModal = x
      this.rdvModalId = x.id
      // console.log(this.rdvModal)
      this.$refs['my-modal'].show()
    },
    hideModal () {
      let data = this.rdvModal
      let dateM = new Date(data['date'])
      console.log(data['date'])
      let mdateM = '' + dateM.toLocaleDateString()
      if (mdateM === 'Invalid Date') {
        mdateM = data['date']
      }
      data.date = mdateM
      console.log(mdateM)
      mdateM = mdateM.replace(/\//gi, '')
      let heureM = data['heure']
      console.log(mdateM)
      heureM = heureM.replace(':', '')
      let childM = '' + data['hopital'] + '' + mdateM + '' + heureM + '' + data.patient
      data.id = childM
      this.$firebaseRefs.rdvList.child(this.rdvModalId).remove()
      this.$firebaseRefs.rdvList.child(childM).set(data)

      setTimeout(() => {
        //
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
