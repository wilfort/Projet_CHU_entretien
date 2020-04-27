<template>
  <div id="content">

    <div>
      <b-row>
        <b-col>
          <h1>Rdv :</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Est-il un nouveau patient ? :</b-col>
        <b-col cols="6">
          <b-form-select v-model="checkPatient">
            <b-form-select-option value="non">Non</b-form-select-option>
            <b-form-select-option value="oui">Yes</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Date : </b-col>
        <b-col cols="6">
          <b-input-group>
            <b-form-input
              v-model="newRdv['date']"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker v-model="newRdv['date']" :date-disabled-fn="dateDisabled" locale="fr"
              button-only
              right></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Examen : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newRdv['examen']">
            <b-form-select-option :value='null' disabled>Choisissez l'Examen</b-form-select-option>
            <b-form-select-option v-for="elemEM in examenM" :key='elemEM.id' :value='elemEM'>{{elemEM}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Heure : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newRdv['heure']">
            <b-form-select-option :value='null' disabled>Choisissez l'heure du Rdv</b-form-select-option>
            <b-form-select-option v-for="elemRDV in heureRDV" :key='elemRDV.id' :value='elemRDV'>{{elemRDV}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">l'Hôpital : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newRdv['hopital']">
            <b-form-select-option :value='null' disabled>Choisissez l'Hôpital</b-form-select-option>
            <b-form-select-option v-for="elemH in hopital" :key='elemH.id' :value='elemH'>{{elemH}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-if="checkPatient=='non'">
        <b-col cols="6">le Patient : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newRdv['patient']">
            <b-form-select-option :value='null' disabled>Choisissez le Patient</b-form-select-option>
            <b-form-select-option v-for="elemP in patientList" :key='elemP.id' :value='elemP.id'>{{elemP.Nom}} {{elemP.Prenom}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Urgent : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newRdv['urgent']">
            <b-form-select-option value="n">Non</b-form-select-option>
            <b-form-select-option value="y">Yes</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
    </div>

    <div v-if="checkPatient==='oui'">
      <b-row>
        <b-col>
          <h1>Rdv :</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Nom : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Nom']" type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Prénom : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Prenom']" type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Sexe : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newPatient['Sexe']">
            <b-form-select-option value="M">Homme</b-form-select-option>
            <b-form-select-option value="F">Femme</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Date de naissance : </b-col>
        <b-col cols="6">
          <b-input-group>
            <b-form-input
              v-model="newPatient['DateN']"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker v-model="newPatient['DateN']" locale="fr"
              button-only
              right></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Diabéte : </b-col>
        <b-col cols="6">
          <b-form-select v-model="newPatient['Diabete']">
            <b-form-select-option value="n">pas de diabéte</b-form-select-option>
            <b-form-select-option value="Type I">type 1</b-form-select-option>
            <b-form-select-option value="Type II">type 2</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Poids en Kg : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Poids']" type="number"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Taille en cm : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Taille']" type="number"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Niss : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Niss']" type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">Téléphone : </b-col>
        <b-col cols="6">
          <b-form-input v-model="newPatient['Niss']" type="tel"></b-form-input>
        </b-col>
      </b-row>
    </div>

    <b-button variant="info" v-on:click="addRdvList()">Nouveau RDV</b-button>

    <b-modal
    ref="my-modal"
    size="lg"
    hide-footer
    modal-header-close
    title="Selectionnée votre hopital">
      <div class="con-form">
        <ul>
          <li>
            <span @click="redic('AgendaCHU')"
              >
                CHU de Charleroi
             </span>
          </li>
          <li>
            <span @click="redic('AgendaCHU')"
              >
              GHDC
            </span>
          </li>
          <li>
           <span @click="redic('AgendaCHU')"
              >
                CNDG
             </span>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>

</template>

<script>
export default {
  data () {
    return {
      active: false,
      input1: '',
      input2: '',
      checkbox1: false,
      popupActive: false,
      checkPatient: 'non',
      keyList: ['RDV', 'Nom, prénom', 'Sexe', 'Date de naissance', 'Diabète', 'Poids', 'Taille', 'IBM', 'Examen', 'NISS', 'Téléphane'],
      patientList: [],
      rdvList: [],
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
      dateJ: new Date(),
      semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      hopital: ['CHU', 'CNDG', 'GHDC'],
      newRdv: {
        'date': '',
        'examen': null,
        'heure': null,
        'hopital': null,
        'patient': null,
        'urgent': 'n',
        'annule': false
      },
      newPatient: {
        'DateN': '',
        'Diabete': 'n',
        'Niss': '',
        'Nom': '',
        'Prenom': '',
        'Sexe': '',
        'Taille': '',
        'Poids': '',
        'Telephone': '',
        'id': ''}
    }
  },
  firebase () {
    return {
      patientList: this.$db.ref('Patient'),
      rdvList: this.$db.ref('Rdv')
    }
  },
  vuesax () {
    return {}
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
    redic: function (elem) {
      this.$refs['my-modal'].hide()
      setTimeout(function () {
        window.location.href = '#/' + elem
      }, 10)
    },
    addRdvList: function () {
      let dateR = new Date(this.newRdv['date'])
      let mdateR = dateR.toLocaleDateString()
      this.newRdv.date = mdateR
      mdateR = mdateR.replace(/\//gi, '')
      let heureR = this.newRdv['heure']
      heureR = heureR.replace(':', '')
      let chid = '' + this.newRdv['hopital'] + '' + mdateR + '' + heureR
      if (this.checkPatient === 'oui') {
        let dateP = new Date(this.newPatient.DateN)
        this.newPatient.DateN = dateP.toLocaleDateString()
        this.newPatient.id = this.patientList.length
        this.addPatientList()
        this.newRdv.patient = this.newPatient.id
      }
      chid += this.newRdv.patient
      this.newRdv.id = chid
      this.$firebaseRefs.rdvList.child(chid).set(this.newRdv)
      this.$refs['my-modal'].show()
    },
    addPatientList: function () {
      this.$firebaseRefs.patientList.child(this.patientList.length).set(this.newPatient)
    }
  }
}

</script>

  <!-- Add 'scoped' attribute to limit CSS to this component only -->
  <style scoped>
  #content{
    text-align: left;
    margin: 0% 25%;
  }
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
  .before {
      top: 50px;
      right: -300px;
      width: 300px;
      background-color:yellow;
      position:absolute;
    }

    .after {
      right: 50px;
    }
</style>
