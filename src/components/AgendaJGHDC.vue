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
        <b-nav-item href="/#/AgendaMGHDC" class="navColRed navColBR"><span class="navColText">Mois</span></b-nav-item>
        <b-nav-item href="#/AgendaSGHDC" class="navColRed "><span class="navColText">Semaine</span></b-nav-item>
        <b-nav-item href="/#/AgendaGHDC" class="navColRed navColBL"><span class="navColText">Jour</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="agendaChu">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-td variant="secondary"><h1><i class="fas fa-calendar-day"></i> Rendez-vous du {{semaine[dateJ.getDay()]}} {{dateJ.toLocaleDateString()}}</h1></b-td>
          </b-tr>
        </b-thead>
        <b-tbody><b-tr><b-td>
        <b-table-simple striped responsive small>
          <b-thead style="margin: 5px 5px 0px 5px">
            <b-tr>
              <b-th>
                RDV
              </b-th>
              <b-th>
                Nom, prénom
              </b-th>
              <b-th>
                  Sexe
              </b-th>
              <b-th>
                  Date de naissance
              </b-th>
              <b-th>
                  Diabète
              </b-th>
              <b-th>
                  Poids
              </b-th>
              <b-th>
                  Taille
              </b-th>
              <b-th>
                  IBM
              </b-th>
              <b-th>
                Examen
              </b-th>
              <b-th>
                  NISS
              </b-th>
              <b-th>
                  Téléphane
              </b-th>
              <b-th>
                <i class="far fa-edit"></i>
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for='entry in rdvList' :key='entry.id' v-show="entry.hopital=='GHDC' && !entry.annule && dateJ.toLocaleDateString()==entry.date">
              <b-td>
                {{entry['heure']}}
              </b-td>
              <b-td>
                {{patientList[entry['patient']]['Nom']}}, {{patientList[entry['patient']]['Prenom']}}
                  <span class="colorH" v-show="entry.examen=='scanner'"><i class="fas fa-x-ray"></i></span>
                  <span class="colorH" v-show="entry.examen=='radio'"><i class="fas fa-biohazard"></i></span>
                  <span class="colorH" v-show="entry.examen=='IRM'"><i class="fas fa-brain"></i></span>
                  <b-badge v-show="entry['urgent']=='y'" pill variant="colorU">URGENT</b-badge>
              </b-td>
              <b-td>
                <span v-if="patientList[entry['patient']]['Sexe']==='M'"><i class="fas fa-male"></i></span><span v-if="patientList[entry['patient']]['Sexe']==='F'"><i class="fas fa-female"></i></span>
              </b-td>
              <b-td>
                {{patientList[entry['patient']]['DateN']}}
              </b-td>
              <b-td>
                <span v-if="patientList[entry['patient']]['Diabete']!='n'"><b-badge variant="colorH">{{patientList[entry['patient']]['Diabete']}}</b-badge></span>
              </b-td>
              <b-td>
                {{patientList[entry['patient']]['Poids']}} kg
              </b-td>
              <b-td>
                {{patientList[entry['patient']]['Taille']}} cm
              </b-td>
              <b-td>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))==0">?</span>
                  <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>0&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<18.5"><b-badge pill variant="colorH">Poids insuffisant</b-badge></span>
                  <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=18.5&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<25">Poids normal</span>
                  <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=25&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<30"><b-badge pill variant="colorH">Excès pondéral, surpoids</b-badge></span>
                  <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=30&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<40"><b-badge pill variant="colorH">Obésité</b-badge></span>
                  <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=40">Obésité morbide</span>
              </b-td>
              <b-td>
                {{entry['examen']}}
              </b-td>
              <b-td>
                {{patientList[entry['patient']]['Niss']}}
              </b-td>
              <b-td>{{patientList[entry['patient']]['Telephone']}}</b-td>
              <b-td><b-button
                    only-arrows
                    icon
                    variant="success"
                    id="show-btn" @click="showModal(entry)"
                  >
                    <i class="far fa-edit"></i>
                  </b-button></b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        </b-td></b-tr></b-tbody>
      </b-table-simple>
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
#agendaChu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
}
.colorH{color:#563d7c}

</style>
