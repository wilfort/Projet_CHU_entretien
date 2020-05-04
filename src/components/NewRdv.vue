<template>
  <div>
    <b-navbar>
       <navBar>
      </navBar>
    </b-navbar>
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
              <b-form-select-option v-for="elemEM in $listeData.examenM" :key='elemEM.id' :value='elemEM'>{{elemEM}}</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">Heure : </b-col>
          <b-col cols="6">
            <b-form-select v-model="newRdv['heure']">
              <b-form-select-option :value='null' disabled>Choisissez l'heure du Rdv</b-form-select-option>
              <b-form-select-option v-for="elemRDV in $listeData.heureRDV" :key='elemRDV.id' :value='elemRDV'>{{elemRDV}}</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">l'Hôpital : </b-col>
          <b-col cols="6">
            <b-form-select v-model="newRdv['hopital']">
              <b-form-select-option :value='null' disabled>Choisissez l'Hôpital</b-form-select-option>
              <b-form-select-option v-for="elemH in $listeData.hopital" :key='elemH.id' :value='elemH'>{{elemH}}</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row v-if="checkPatient=='non'">
          <b-col cols="6">le Patient : </b-col>
          <b-col cols="6">
            <b-form-select v-model="newRdv['patient']">
              <b-form-select-option value="" disabled>Choisissez le Patient</b-form-select-option>
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
            <h1>Patient :</h1>
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
            <b-form-input v-model="newPatient['Telephone']" type="tel"></b-form-input>
          </b-col>
        </b-row>
      </div>
      <b-button variant="info" v-on:click="addRdvList()">Nouveau RDV</b-button>
      <div>{{messageErreurNewRDV}}</div>
    </div>
    <b-modal
        ref="my-modal"
        size="lg"
        hide-footer
        modal-header-close
        title="Selectionnée votre hopital">
        <div class="con-form">
          <ul>
            <li>
              <span @click="redic('Agenda/CHU')"
                >
                  CHU de Charleroi
              </span>
            </li>
            <li>
              <span @click="redic('Agenda/GHDC')"
                >
                GHDC
              </span>
            </li>
            <li>
            <span @click="redic('Agenda/CNDG')"
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
import navBar from '@/components/navBar'
import {dateDisabled as desativationDate} from '../js/fonction'
export default {
  components: {
    navBar
  },
  data () {
    return {
      checkPatient: 'non', // c'est pour pouvoir crée un nouveau patient
      patientList: [],
      rdvList: [],
      newRdv: { // information du nouveau rendez-vous
        'date': '',
        'examen': null,
        'heure': null,
        'hopital': null,
        'patient': '',
        'urgent': 'n',
        'annule': false
      },
      newPatient: { // information du nouveau patient
        'DateN': '',
        'Diabete': 'n',
        'Niss': '',
        'Nom': '',
        'Prenom': '',
        'Sexe': '',
        'Taille': '',
        'Poids': '',
        'Telephone': '',
        'id': ''},
      messageErreurNewRDV: '' // message pour manque d'information lord de la création du nouveau rendez-vous
    }
  },
  firebase () {
    return {
      patientList: this.$db.ref('Patient'),
      rdvList: this.$db.ref('Rdv')
    }
  },

  methods: {
    dateDisabled: desativationDate,
    redic: function (elem) {
      this.$refs['my-modal'].hide()
      setTimeout(function () {
        window.location.href = '#/' + elem
      }, 10)
    },
    addRdvList: function () {
      this.messageErreurNewRDV = ''
      if ((this.newRdv['date'] !== '' && this.newRdv['heure'] !== null && this.newRdv['hopital'] !== null && this.newRdv['examen'] !== null) && ((this.checkPatient === 'non' && this.newRdv['patient'] !== '') || (this.checkPatient === 'oui' && this.newPatient['DateN'] !== '' && this.newPatient['Nom'] !== '' && this.newPatient['Prenom'] !== '' && this.newPatient['Sexe'] !== '' && this.newPatient['Niss'] !== '' && this.newPatient['Taille'] !== '' && this.newPatient['Poids'] !== '' && this.newPatient['Telephone'] !== ''))) { // verification si ne manque pas d'information
        let dateR = new Date(this.newRdv['date'])
        let mdateR = dateR.toLocaleDateString()
        this.newRdv.date = mdateR
        mdateR = mdateR.replace(/\//gi, '')
        let heureR = this.newRdv['heure']
        heureR = heureR.replace(':', '')
        let chid = '' + this.newRdv['hopital'] + '' + mdateR + '' + heureR
        if (this.checkPatient === 'oui') { // test si nouveau patient
          let dateP = new Date(this.newPatient.DateN)
          this.newPatient.DateN = dateP.toLocaleDateString()
          this.newPatient.id = this.patientList.length
          this.addPatientList()
          this.newRdv.patient = this.newPatient.id
        }
        chid += this.newRdv.patient // cle element pour la table Rdv de firebase
        this.newRdv.id = chid
        this.$firebaseRefs.rdvList.child(chid).set(this.newRdv)
        this.$refs['my-modal'].show()
      } else {
        this.messageErreurNewRDV = 'Le ou Les élément(s) qui est/sont manquent :'
        for (let elem in this.newRdv) {
          if ((this.newRdv[elem] === '' || this.newRdv[elem] === null) && (this.checkPatient === 'non' || (elem !== 'patient' && this.checkPatient === 'oui'))) {
            this.messageErreurNewRDV += ' ' + elem + ','
          }
        }
        if (this.checkPatient === 'oui') {
          for (let elem in this.newPatient) {
            if (elem !== 'id') {
              if (this.newPatient[elem] === '' || this.newPatient[elem] === null) {
                if (elem !== 'DateN') {
                  this.messageErreurNewRDV += ' ' + elem + ','
                } else {
                  this.messageErreurNewRDV += ' Date de Naissance,'
                }
              }
            }
          }
        }
        this.messageErreurNewRDV = this.messageErreurNewRDV.substring(0, this.messageErreurNewRDV.length - 1)
        this.messageErreurNewRDV += '.'
      }
    },
    addPatientList: function () { // fonction de création de nouveau patient dans la table patient de firebase
      this.$firebaseRefs.patientList.child(this.patientList.length).set(this.newPatient)
    }
  }
}

</script>

  <!-- Add 'scoped' attribute to limit CSS to this component only -->
  <style scoped>
  #content{
    text-align: left;
    margin-top: 25px;
    margin-right: 25%;
    margin-left: 25%;
  }
  .modal .ul {
    list-style-type: none;
    padding: 0;
  }
  .modal li {
    display: inline-block;
    margin: 0 10px;

    color: #42b983;

  }

</style>
