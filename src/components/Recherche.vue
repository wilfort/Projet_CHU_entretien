<template>
  <div>
    <b-navbar>
       <navBar>
      </navBar>
    </b-navbar>
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
        <b-form-checkbox v-model="checkedAnnulation" name="check-button" switch>
          Afficher les rendez-vous annulés
        </b-form-checkbox>
    </div>
    <b-button only-arrows icon variant="danger" @click="recherche"><i class="fas fa-neuter rotate-315"></i> Recherche</b-button>
    <div class="center grid" v-show="voirRecherche" style="margin-top: 20px;">
      <b-table-simple striped responsive small>
        <b-thead>
          <b-tr>
            <b-th>
              <div class="title"><span>
              RDV</span><span><i class="fas fa-arrow-up fa-xs" @click="onChangeTri('rdv','asc')"></i>
              <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('rdv','dsc')"></i></span></div>
            </b-th>
            <b-th>
              <div class="title"><span>Nom, prénom</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('nom','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('nom','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Sexe</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('sexe','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('sexe','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Date de naissance</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('dateN','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('dateN','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Diabète</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('diabete','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('diabete','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Poids</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('poids','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('poids','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Taille</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('taille','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('taille','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>IBM</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('ibm','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('ibm','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
              <div class="title"><span>Examen</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('examen','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('examen','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>NISS</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('niss','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('niss','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
                <div class="title"><span>Téléphane</span><span>
                <i class="fas fa-arrow-up fa-xs" @click="onChangeTri('tel','asc')"></i>
                <i class="fas fa-arrow-down fa-xs" @click="onChangeTri('tel','dsc')"></i>
                </span></div>
            </b-th>
            <b-th>
              <i class="far fa-edit"></i>
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody >
          <b-tr v-for='entry in rechercheRdv()' :key='entry.id' class="list-rdv">
            <b-td>
              {{entry['date']}} {{entry['heure']}}
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
              <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))==0"><b-badge pill variant="colorH">?</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>0&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<18.5"><b-badge pill variant="colorH">Poids insuffisant</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=18.5&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<25">Poids normal</span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=25&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<30"><b-badge pill variant="colorH">Excès pondéral, surpoids</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=30&&(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))<40"><b-badge pill variant="colorH">Obésité</b-badge></span>
                <span v-if="(patientList[entry['patient']]['Poids']/((patientList[entry['patient']]['Taille']/100)*(patientList[entry['patient']]['Taille']/100)))>=40"><b-badge pill variant="colorH">Obésité morbide</b-badge></span>
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
      <div>
        Show <b-form-select v-model="limitParPage" style="width: 100px" v-on:change="onChangeNBPage($event)">
      <b-form-select-option v-for="nbrPage in nbrElemParPage" :key='nbrPage.id' :value='nbrPage'>{{nbrPage}}</b-form-select-option>
      </b-form-select> entries</div>
      <div>
        <b-pagination>
          </b-pagination>
      </div>
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
  </div></div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
import * as fonction from '../js/fonction'
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      limitParPage: 5,
      memoireRecherche: [],
      elementModal: {
        rdvModalN: '',
        rdvModal: {},
        rdvModalId: ''
      },
      checkedAnnulation: false,
      checkedRecherche: false,
      voirRecherche: false,
      nbrElemParPage: [5, 10, 20, 50, 100],
      rechercheRealiser: false,

      rechercheRDV: {
        'rdv': {'asc': false, 'dsc': false, 'memo': ''},
        'nom': {'asc': false, 'dsc': false, 'memo': ''},
        'sexe': {'asc': false, 'dsc': false, 'memo': ''},
        'dateN': {'asc': false, 'dsc': false, 'memo': ''},
        'diabete': {'asc': false, 'dsc': false, 'memo': ''},
        'poids': {'asc': false, 'dsc': false, 'memo': ''},
        'taille': {'asc': false, 'dsc': false, 'memo': ''},
        'ibm': {'asc': false, 'dsc': false, 'memo': ''},
        'examen': {'asc': false, 'dsc': false, 'memo': ''},
        'niss': {'asc': false, 'dsc': false, 'memo': ''},
        'tel': {'asc': false, 'dsc': false, 'memo': ''}},
      modificationModal: false,

      // pour la recherche
      dateDebutR: null,
      dateFinR: null,
      dateNPR: null,
      patientR: null,

      rdvRecherche: [],

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
  methods: {
    onChangeTri(elem1, elem2){// pour décidé commant tri par rapport aux éléments et à la direction
      this.rechercheRDV[elem1][elem2]=true
      setTimeout(() => {
        this.pagination()
      }, 1);
    },
    onChangeNBPage(event){//modification de la limite du nombre d'élément par page de la pagination.
      this.limitParPage = event
      setTimeout(() => {
        this.pagination()
      }, 1);
    },
    /*******************/
    /* fonction de tri */
    /*******************/
    classerDateRdv(a, b) {
      let valdateA = a.date.split('/')
      let valheureA = a.heure.replace(/\:/gi, '')
      let valdateB = b.date.split('/')
      let valheureB = b.heure.replace(/\:/gi, '')
      let testA =''+valdateA[2]+''+valdateA[1]+''+valdateA[0]+''+valheureA
      let testB =''+valdateB[2]+''+valdateB[1]+''+valdateB[0]+''+valheureB
      return testA - testB;
    },
    classerDateRdvInv(a, b) {
      return this.classerDateRdv(b, a);
    },
    classerNiss(a, b) {
      return this.patientList[a.patient].Niss - this.patientList[b.patient].Niss;
    },
    classerNissInv(a, b) {
      return this.classerNiss(b, a);
    },
    classerPoids(a, b) {
      return this.patientList[a.patient].Poids - this.patientList[b.patient].Poids;
    },
    classerPoidsInv(a, b) {
      return this.classerPoids(b, a);
    },
    classerTaille(a, b) {
      return this.patientList[a.patient].Taille - this.patientList[b.patient].Taille;
    },
    classerTailleInv(a, b) {
      return this.classerTaille(b, a);
    },
    classerIbm(a, b) {
      return (this.patientList[a.patient].Poids/((this.patientList[a.patient].Taille/100)*(this.patientList[a.patient].Taille/100))) - (this.patientList[b.patient].Poids/((this.patientList[b.patient].Taille/100)*(this.patientList[b.patient].Taille/100)));
    },
    classerIbmInv(a, b) {
      return this.classerIbm(b, a);
    },
    classerTel(a, b) {
      let nomA = this.patientList[a.patient].Telephone
      let nomB = this.patientList[b.patient].Telephone
        if (nomA < nomB)
          {return -1;}
        else (nomA > nomB )
          {return 1;}
    },
    classerTelInv(a, b) {
      return this.classerTel(b, a);
    },
    classerDateN(a, b) {
      let valdateA = this.patientList[a.patient].DateN.split('/')
      let valdateB = this.patientList[b.patient].DateN.split('/')
      let testA =''+valdateA[2]+''+valdateA[1]+''+valdateA[0]
      let testB =''+valdateB[2]+''+valdateB[1]+''+valdateB[0]
      if (testA < testB){
        return 1;
      } else if (testA > testB) {
        return -1;
      } else {
        return 0;
      }
    },
    classerDateNInv(a, b) {
      return this.classerDateN(b, a);
    },
    classerSexe(a, b) {
      let nomA = this.patientList[a.patient].Sexe.toUpperCase()
      let nomB = this.patientList[b.patient].Sexe.toUpperCase()
        if (nomA < nomB)
          {return -1;}
        else (nomA > nomB )
          {return 1;}
    },
    classerSexeInv(a, b) {
      return this.classerSexe(b, a);
    },
    classerExamen(a, b) {
      let nomA = a.examen.toUpperCase()
      let nomB = b.examen.toUpperCase()
        if (nomA < nomB)
          {return -1;}
        else (nomA > nomB )
          {return 1;}
    },
    classerExamenInv(a, b) {
      return this.classerExamen(b, a);
    },
    classerDiabete(a, b) {
      let nomA = this.patientList[a.patient].Diabete.toUpperCase()
      let nomB = this.patientList[b.patient].Diabete.toUpperCase()
        if (nomA < nomB)
          {return -1;}
        else (nomA > nomB )
          {return 1;}
    },
    classerDiabeteInv(a, b) {
      let nomA = this.patientList[a.patient].Diabete.toUpperCase()
      let nomB = this.patientList[b.patient].Diabete.toUpperCase()
        if (nomA > nomB)
          {return -1;}
        else (nomA < nomB )
          {return 1;}
    },
    classerNomPrenom(a, b) {
      let nomA = this.patientList[a.patient].Nom.toUpperCase()
      let prenomA = this.patientList[a.patient].Prenom.toUpperCase()
      let nomB = this.patientList[b.patient].Nom.toUpperCase()
      let prenomB =this.patientList[b.patient].Prenom.toUpperCase()
      if(nomA == nomB){
        if (prenomA < prenomB)
          {return -1;}
        else (prenomA > prenomB )
          {return 1;}
      } else {
        if (nomA < nomB)
          {return -1;}
        else (nomA > nomB )
          {return 1;}
      }
    },
    classerNomPrenomInv(a, b) {
      let nomA = this.patientList[a.patient].Nom.toUpperCase()
      let prenomA = this.patientList[a.patient].Prenom.toUpperCase()
      let nomB = this.patientList[b.patient].Nom.toUpperCase()
      let prenomB =this.patientList[b.patient].Prenom.toUpperCase()
      if(nomA == nomB){
        if (prenomA > prenomB)
          {return -1;}
        else (prenomA < prenomB )
          {return 1;}
      } else {
        if (nomA > nomB)
          {return -1;}
        else (nomA < nomB )
          {return 1;}
      }
    },
    restTabTri(){
      let triTab = ['rdv', 'nom', 'dateN', 'diabete', 'ibm', 'niss', 'poids', 'sexe', 'taille', 'tel', 'examen']
      triTab.forEach(element => {
        this.rechercheRDV[element]['memo']=''
      });
    },

    rechercheRdv () {// recuperer les données de la recherche avec ou sans triage
      let rdvRecherche = []
      let triTab = ['rdv', 'nom', 'dateN', 'diabete', 'ibm', 'niss', 'poids', 'sexe', 'taille', 'tel', 'examen']
      let dateDR = (new Date(this.dateDebutR)).toLocaleDateString()
      let dateFR = (new Date(this.dateFinR)).toLocaleDateString()
      let dateN = (new Date(this.dateNPR)).toLocaleDateString()
      let testValDDR = dateDR.split('/')
      let valDateDR = '' + testValDDR[2] + '' + testValDDR[1] + '' + testValDDR[0]
      let testValDFR = dateFR.split('/')
      let valDateFR = '' + testValDFR[2] + '' + testValDFR[1] + '' + testValDFR[0]
      let testValR = null
      let valDateR = null
      if (this.checkedRecherche && !this.rechercheRealiser)
      {
        this.rechercheRealiser=true
        this.rdvList.forEach(element => {
          testValR = element.date.split('/')
          valDateR = '' + testValR[2] + '' + testValR[1] + '' + testValR[0]
          if (
            ((!element.annule && !this.checkedAnnulation) || this.checkedAnnulation) && (this.patientR === element.patient || this.patientR === null) && ((this.dateNPR === null || this.dateNPR === '') || (dateN === this.patientList[element.patient].DateN)) && (((this.dateDebutR === null || dateDR === 'Invalid Date') && (this.dateFinR === null || dateFR === 'Invalid Date')) || ((this.dateDebutR === null || dateDR === 'Invalid Date') && dateDR === element.date) || (valDateDR <= valDateR && valDateFR >= valDateR) || ((this.dateFinR === null || dateFR === 'Invalid Date') && dateFR === element.date))) {
            rdvRecherche.push(element)
          }
        })
        this.memoireRecherche = rdvRecherche
      } else {
        rdvRecherche = this.memoireRecherche
        };
        triTab.forEach(element => {

          if ((this.rechercheRDV[element].asc==true && (this.rechercheRDV[element].memo==''||this.rechercheRDV[element].memo=='dsc'))||(this.modificationModal && this.rechercheRDV[element].memo=='asc')) {
            this.restTabTri()
            if (element=='rdv'){
              rdvRecherche.sort(this.classerDateRdv)}
              else if (element=='nom'){
              rdvRecherche.sort(this.classerNomPrenom)}
              else if (element=='dateN'){
              rdvRecherche.sort(this.classerDateN)}
              else if (element=='diabete'){
              rdvRecherche.sort(this.classerDiabete)}
              else if (element=='sexe'){
              rdvRecherche.sort(this.classerSexe)}
              else if (element=='examen'){
              rdvRecherche.sort(this.classerExamen)}
              else if (element=='ibm'){
              rdvRecherche.sort(this.classerIbm)}
              else if (element=='niss'){
              rdvRecherche.sort(this.classerNiss)}
              else if (element=='poids'){
              rdvRecherche.sort(this.classerPoids)}
              else if (element=='taille'){
              rdvRecherche.sort(this.classerTaille)}
              else if (element=='tel'){
              rdvRecherche.sort(this.classerTel)}
            this.rechercheRDV[element].memo='asc'
            this.rechercheRDV[element].asc=false
          }
          if ((this.rechercheRDV[element].dsc==true && (this.rechercheRDV[element].memo==''||this.rechercheRDV[element].memo=='asc'))||(this.modificationModal && this.rechercheRDV[element].memo=='dsc')) {
            this.restTabTri()
            this.rechercheRDV[element].memo='dsc'
            this.rechercheRDV[element].dsc=false
            if (element=='rdv'){
            rdvRecherche.sort(this.classerDateRdvInv)}
            else if (element=='nom'){
              rdvRecherche.sort(this.classerNomPrenomInv)}
            else if (element=='dateN'){
              rdvRecherche.sort(this.classerDateNInv)}
            else if (element=='diabete'){
              rdvRecherche.sort(this.classerDiabeteInv)}
            else if (element=='sexe'){
              rdvRecherche.sort(this.classerSexeInv)}
            else if (element=='examen'){
              rdvRecherche.sort(this.classerExamenInv)}
            else if (element=='ibm'){
              rdvRecherche.sort(this.classerIbmInv)}
            else if (element=='niss'){
              rdvRecherche.sort(this.classerNissInv)}
            else if (element=='poids'){
              rdvRecherche.sort(this.classerPoidsInv)}
            else if (element=='taille'){
              rdvRecherche.sort(this.classerTailleInv)}
            else if (element=='tel'){
              rdvRecherche.sort(this.classerTelInv)}
          }
      })
        this.memoireRecherche = rdvRecherche
        this.modificationModal=false
        return rdvRecherche
    },
    /**************************/
    /* fonction pour le modal */
    /**************************/
    dateDisabled: fonction.dateDisabled,
    showModal: fonction.showModal,
    hideModal: fonction.hideModal,
    traitementModal: fonction.TraitementModal,
    openModal (elem) {// ouverture du modal
      this.elementModal.rdvModalN = this.patientList[elem['patient']]['Nom'] + ' ' + this.patientList[elem['patient']]['Prenom']
      this.elementModal.rdvModal = elem
      this.elementModal.rdvModalId = elem.id
      this.showModal()
    },
    fermetureModal () {// fermeture du modal
      this.traitementModal(this.elementModal)
      this.elemModale = {
        rdvModalN: '',
        rdvModal: {},
        rdvModalId: ''
      }
      this.modificationModal = true
      this.hideModal()
    },
    /*****************************/
    /* fonction da la pagination */
    /*****************************/
    pagination (){
      var limitParPage = this.limitParPage// limitParPage est le nombre élément que on affiche par page
      $(function(){
          $('.pagination').empty()
          $('.pagination').append('<li id="previous-page"><a class="page-link" href="#" aria-label="Prev"><span aria-hidden="true">Previous</span><span class="sr-only">Prev</span></a></li>')
          /***Ne montrer que le nombre élément en fonction de la 'limitParPage' dans chaque onglet***/
          var numberOfImages = $('.list-rdv').length;//crée une variable 'numberOfImages' qui sélectionne l'élément avec la classe 'list-rdv'

          $('.list-rdv').show();
          $('.list-rdv:gt(' + (limitParPage - 1) +')').hide();
          //:gt() signifie que l'Éléments dont l'index est supérieur à (greater than) l'index spécifié

          /***Partager les éléments par page***/
          var totalPages = Math.ceil(numberOfImages / limitParPage);// math.round() arrondi à l'entier le plus proche
          $('.pagination').append('<li class="current-page active page-item"><a class="page-link" href="#">' + 1 + '</a></li>'); // append() signifie qu'on insère du contenu à la fin de la sélection ;

          /***faire une boucle pour ajouter des paginations par à port aux nombres de pages besoin***/
          for (var i = 2; i <= totalPages; i++) {
            $('.pagination').append('<li class="current-page page-item"><a class="page-link" href="#">' + i + '</a></li>');
          }
          $('.pagination').append('<li id="next-page"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">Next</span><span class="sr-only">Next</span></a></li>')
          $('.pagination li.current-page').on('click', function() {
            if($(this).hasClass('active')){
              return false;
            } else {
              var currentPage = $(this).index();
              $('.pagination li').removeClass('active');
              $(this).addClass('active');
              $('.list-rdv').hide();
              var grandTotal = limitParPage * currentPage;
              for (var i = grandTotal - limitParPage; i < grandTotal; i++) {
                $('.list-rdv:eq(' + i + ')').show();
              }
            }
          });
          $('#next-page').on('click', function() {
            var currentPage = $('.pagination li.active').index();
            if (currentPage === totalPages) {
              return false;
            } else {
              currentPage++;
              $('.pagination li').removeClass('active');
              $('.list-rdv').hide();
              var grandTotal = limitParPage * currentPage;
              for (var i = grandTotal - limitParPage; i < grandTotal; i++) {
                $('.list-rdv:eq(' + i + ')').show();
              }
              $('.pagination li.current-page:eq(' + (currentPage - 1) + ')').addClass('active');
            }
          });
          $('#previous-page').on('click', function() {
            var currentPage = $('.pagination li.active').index();
            if (currentPage === 1) {
              return false;
            } else {
              currentPage--;
              $('.pagination li').removeClass('active');
              $('.list-rdv').hide();
              var grandTotal = limitParPage * currentPage;
              for (var i = grandTotal - limitParPage; i < grandTotal; i++) {
                $('.list-rdv:eq(' + i + ')').show();
              }
              $('.pagination li.current-page:eq(' + (currentPage - 1) + ')').addClass('active');
            }
          });
          /***Enlever les dièses dans l'url quand tu cliques sur un lien***/
          /*ici je remplace javascript:void[0] (l'apparition du # dans l'url), plus clean
          (& empèche que quand tu cliques sur le lien cela remonte en haut)*/
          $('.page-link').on('click',function(e) {//Cette parti ce met à la fin car j'ai créé les boutton dans mon js
            e.preventDefault();
          });
        });
    },
    recherche (){
      this.checkedRecherche=true
      setTimeout(()=>{
        this.checkedRecherche=false
        this.rechercheRealiser=false
        this.pagination()
      },1)
      this.voirRecherche=true
    },
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
  margin-top: 40px;
}
.colorH{color:#563d7c}
.title{
  display: flex;
  justify-content: space-between;}
.pagination{
  display: flex;
  justify-content: flex-end;
}

</style>
