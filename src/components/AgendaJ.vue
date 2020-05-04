
<template>
  <div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item href="/#/" class="navColRed navColBR"><span class="navColText">Accueil</span></b-nav-item>
        <b-nav-item href="/#/Agenda/CHU" class="navColRed" @click='hopital="CHU"'><span class="navColText">CHU</span></b-nav-item>
        <b-nav-item href="/#/Agenda/GHDC" class="navColRed" @click='hopital="GHDC"'><span class="navColText">GHDC</span></b-nav-item>
        <b-nav-item href="/#/Agenda/CNDG" class="navColRed" @click='hopital="CNDG"'><span class="navColText">CNDG</span></b-nav-item>
        <b-nav-item href="/#/Recherche" class="navColRed"><span class="navColText">Recherche RDV</span></b-nav-item>
        <b-nav-item href="/#/NewRdv" class="navColRed navColBL"><span class="navColText">Nouveau RDV</span></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :href='"/#/AgendaM/"+hopital' class="navColRed navColBR"><span class="navColText">Mois</span></b-nav-item>
        <b-nav-item :href='"/#/AgendaS/"+hopital' class="navColRed "><span class="navColText">Semaine</span></b-nav-item>
        <b-nav-item :href='"/#/Agenda/"+hopital' class="navColRed navColBL"><span class="navColText">Jour</span></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="agendaChu">
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-td variant="secondary"><h1><i class="fas fa-calendar-day"></i> Rendez-vous du {{$listeData.semaine[$listeData.dateJ.getDay()]}} {{$listeData.dateJ.toLocaleDateString()}}</h1></b-td>
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
            <b-tr v-for='entry in rdvJour()' :key='entry.id'>
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
                    id="show-btn" @click="openModal(entry)"
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
                <h3>Rdv du patient : {{elementModal.rdvModalN}}</h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">Date : </b-col>
              <b-col cols="6">
                <b-input-group>
                  <b-form-input
                    v-model="elementModal.rdvModal['date']"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-form-datepicker v-model="elementModal.rdvModal['date']" :date-disabled-fn="dateDisabled" locale="fr"
                    button-only
                    right></b-form-datepicker>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">Examen : </b-col>
              <b-col cols="6">
                <b-form-select v-model="elementModal.rdvModal['examen']">
                  <b-form-select-option v-for="elemEM in $listeData.examenM" :key='elemEM.id' :value='elemEM'>{{elemEM}}</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">Heure : </b-col>
              <b-col cols="6">
                <b-form-select v-model="elementModal.rdvModal['heure']">
                  <b-form-select-option v-for="elemRDV in $listeData.heureRDV" :key='elemRDV.id' :value='elemRDV'>{{elemRDV}}</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">l'Hôpital : </b-col>
              <b-col cols="6">
                <b-form-select v-model="elementModal.rdvModal['hopital']">
                  <b-form-select-option v-for="elemH in $listeData.hopital" :key='elemH.id' :value='elemH'>{{elemH}}</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">Urgent : </b-col>
              <b-col cols="6">
                <b-form-select v-model="elementModal.rdvModal['urgent']">
                  <b-form-select-option value="n">Non</b-form-select-option>
                  <b-form-select-option value="y">Yes</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="fermetureModal">Close Me</b-button>
        </b-modal>
      </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import * as fonction from '../js/fonction'
export default {
  data () {
    return {
      hopital: '',
      patientList: [],
      rdvList: [],
      elementModal: {
        rdvModalN: '',
        rdvModal: {},
        rdvModalId: ''
      }
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
    rdvJour () {
      let rdv = []
      this.rdvList.forEach(element => {
        if (element.hopital === this.hopital && !element.annule && this.$listeData.dateJ.toLocaleDateString() === element.date) {
          rdv.push(element)
        }
      })
      return rdv
    },
    dateDisabled: fonction.dateDisabled,
    showModal: fonction.showModal,
    hideModal: fonction.hideModal,
    traitementModal: fonction.TraitementModal,
    openModal (elem) {
      this.elementModal.rdvModalN = this.patientList[elem['patient']]['Nom'] + ' ' + this.patientList[elem['patient']]['Prenom']
      this.elementModal.rdvModal = elem
      this.elementModal.rdvModalId = elem.id
      this.showModal()
    },
    fermetureModal () {
      this.traitementModal(this.elementModal)
      this.elemModale = {
        rdvModalN: '',
        rdvModal: {},
        rdvModalId: ''
      }
      this.hideModal()
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
