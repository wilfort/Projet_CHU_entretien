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
        <b-form-checkbox v-model="checkedA" name="check-button" switch>
          Afficher les rendez-vous annulés
        </b-form-checkbox>
    </div>
    <b-button only-arrows icon variant="danger" @click="recherche"><i class="fas fa-neuter rotate-315"></i> Recherche</b-button>
    <div class="center grid" v-show="checkedRechercheV">
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
      <div>
        Show <b-form-select v-model="limitPerPage" style="width: 100px" v-on:change="onChangeNBPage($event)">
      <b-form-select-option v-for="nbrPage in nbrPerPage" :key='nbrPage.id' :value='nbrPage'>{{nbrPage}}</b-form-select-option>
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
  </div></div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
export default {
  data () {
    return {
      limitPerPage: 5,
      items: [],
      rdvModalId: '',
      rdvModalN: '',
      rdvModal: {},
      keyM: '',
      checkedA: false,
      checkedRecherche: false,
      checkedRechercheV: false,
      nbrPerPage:[5, 10, 20, 50, 100],
      memo: 0,
      patientR: null,
      rechercheRDV:{
        'rdv': {'asc': false, 'dsc': false, 'memo': ''},
        'nom':{'asc': false, 'dsc': false, 'memo': ''},
        'sexe': {'asc': false, 'dsc': false, 'memo': ''},
        'dateN': {'asc': false, 'dsc': false, 'memo': ''},
        'diabete': {'asc': false, 'dsc': false, 'memo': ''},
        'poids': {'asc': false, 'dsc': false, 'memo': ''},
        'taille': {'asc': false, 'dsc': false, 'memo': ''},
        'ibm': {'asc': false, 'dsc': false, 'memo': ''},
        'examen': {'asc': false, 'dsc': false, 'memo': ''},
        'niss': {'asc': false, 'dsc': false, 'memo': ''},
        'tel': {'asc': false, 'dsc': false, 'memo': ''}},
      dateDebutR: null,
      dateFinR: null,
      dateNPR: null,
      patientList: [],
      rdvRecherche: [],
      rdvList: [],
      // dateJ: new Date(),
      // semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
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
    onChangeTri(elem1,elem2){
      this.rechercheRDV[elem1][elem2]=true
      setTimeout(() => {
        this.pagination()
      }, 1);
    },
    onChangeNBPage(event){
      this.limitPerPage = event
      console.log(event)
      setTimeout(() => {
        this.pagination()
      }, 1);
    },
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
      let valdateA = a.date.split('/')
      let valheureA = a.heure.replace(/\:/gi, '')
      let valdateB = b.date.split('/')
      let valheureB = b.heure.replace(/\:/gi, '')
      let testA =''+valdateA[2]+''+valdateA[1]+''+valdateA[0]+''+valheureA
      let testB =''+valdateB[2]+''+valdateB[1]+''+valdateB[0]+''+valheureB
      return testB - testA;
    },
    classerNiss(a, b) {
      return this.patientList[a.patient].Niss - this.patientList[b.patient].Niss;
    },
    classerNissInv(a, b) {
      return this.patientList[b.patient].Niss - this.patientList[a.patient].Niss;
    },
    classerPoids(a, b) {
      return this.patientList[a.patient].Poids - this.patientList[b.patient].Poids;
    },
    classerPoidsInv(a, b) {
      return this.patientList[b.patient].Poids - this.patientList[a.patient].Poids;
    },
    classerTaille(a, b) {
      return this.patientList[a.patient].Taille - this.patientList[b.patient].Taille;
    },
    classerTailleInv(a, b) {
      return this.patientList[b.patient].Taille - this.patientList[a.patient].Taille;
    },
    classerIbm(a, b) {
      return (this.patientList[a.patient].Poids/((this.patientList[a.patient].Taille/100)*(this.patientList[a.patient].Taille/100))) - (this.patientList[b.patient].Poids/((this.patientList[b.patient].Taille/100)*(this.patientList[b.patient].Taille/100)));
    },
    classerIbmInv(a, b) {
      return (this.patientList[b.patient].Poids/((this.patientList[b.patient].Taille/100)*(this.patientList[b.patient].Taille/100))) - (this.patientList[a.patient].Poids/((this.patientList[a.patient].Taille/100)*(this.patientList[a.patient].Taille/100)));
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
      let nomA = this.patientList[a.patient].Telephone
      let nomB = this.patientList[b.patient].Telephone
        if (nomA > nomB)
          {return -1;}
        else (nomA < nomB )
          {return 1;}
    },
    classerDateN(a, b) {
      let valdateA = a.date.split('/')
      let valdateB = b.date.split('/')
      let testA =''+valdateA[2]+''+valdateA[1]+''+valdateA[0]
      let testB =''+valdateB[2]+''+valdateB[1]+''+valdateB[0]
      return testA - testB;
    },
    classerDateNInv(a, b) {
      let valdateA = this.patientList[a.patient].DateN.split('/')
      let valdateB = this.patientList[b.patient].DateN.split('/')
      let testA =''+valdateA[2]+''+valdateA[1]+''+valdateA[0]
      let testB =''+valdateB[2]+''+valdateB[1]+''+valdateB[0]
      return testB - testA;
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
      let nomA = this.patientList[a.patient].Sexe.toUpperCase()
      let nomB = this.patientList[b.patient].Sexe.toUpperCase()
        if (nomA > nomB)
          {return -1;}
        else (nomA < nomB )
          {return 1;}
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
      let nomA = a.examen.toUpperCase()
      let nomB = b.examen.toUpperCase()
        if (nomA > nomB)
          {return -1;}
        else (nomA < nomB )
          {return 1;}
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
    rechercheRdv () {
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
      if (this.checkedRecherche && this.memo < 1)
      {
        this.memo++
        this.rdvList.forEach(element => {
          testValR = element.date.split('/')
          valDateR = '' + testValR[2] + '' + testValR[1] + '' + testValR[0]
          if (
            ((!element.annule && !this.checkedA) || this.checkedA) && (this.patientR === element.patient || this.patientR === null) && ((this.dateNPR === null || this.dateNPR === '') || (dateN === this.patientList[element.patient].DateN)) && (((this.dateDebutR === null || dateDR === 'Invalid Date') && (this.dateFinR === null || dateFR === 'Invalid Date')) || ((this.dateDebutR === null || dateDR === 'Invalid Date') && dateDR === element.date) || (valDateDR <= valDateR && valDateFR >= valDateR) || ((this.dateFinR === null || dateFR === 'Invalid Date') && dateFR === element.date))) {
            rdvRecherche.push(element)
          }
        })
        this.items = rdvRecherche
        // rdvRecherche.sort(this.classerNomPrenom)
        console.log(this.rechercheRDV)
      } else {
        rdvRecherche = this.items
        // rdvRecherche.sort(this.classerNomPrenom)
        };
        triTab.forEach(element => {
          if (this.rechercheRDV[element].asc==true && (this.rechercheRDV[element].memo==''||this.rechercheRDV[element].memo=='dsc')) {
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
          if (this.rechercheRDV[element].dsc==true && (this.rechercheRDV[element].memo==''||this.rechercheRDV[element].memo=='asc')) {
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
        this.items = rdvRecherche
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
    },
    pagination (){
      var limitPerPage = this.limitPerPage
      $(function(){
          $('.pagination').empty()
          $('.pagination').append('<li id="previous-page"><a class="page-link" href="#" aria-label="Prev"><span aria-hidden="true">Previous</span><span class="sr-only">Prev</span></a></li>')
          /***Ne montrer que trois élément dans chaque onglet***/
          var numberOfImages = $('.list-rdv').length;//crée une variable numberOfImages qui sélectionne l'élément avec la classe list-img dans l'élément avec l'id loop et conte les
          console.log(limitPerPage);
          $('.list-rdv').show();
          $('.list-rdv:gt(' + (limitPerPage - 1) +')').hide();
          //:gt() signifie que l'Éléments dont l'index est supérieur à (greater than) l'index spécifié
          // limitPerPage est un tableau commençant par 0 donc renvois 4 éléments (dans ma var limitPerPage), pour laisser 3 élément on doit diminuer les élément afficher dans le tableau

          /***Partager les éléments par page***/
          var totalPages = Math.ceil(numberOfImages / limitPerPage);// math.round() arrondi à l'entier le plus proche
          console.log(totalPages);
          $('.pagination').append('<li class="current-page active page-item"><a class="page-link" href="#">' + 1 + '</a></li>'); // append() signifie qu'on insère du contenu à la fin de la sélection ;

          /***faire une boucle pour ajouter des paginations par à port aux nombres de pages besoin***/
          for (var i = 2; i <= totalPages; i++) {
            $('.pagination').append('<li class="current-page page-item"><a class="page-link" href="#">' + i + '</a></li>');
            console.log(i);
          }
          $('.pagination').append('<li id="next-page"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">Next</span><span class="sr-only">Next</span></a></li>')
          $('.pagination li.current-page').on('click', function() {
            if($(this).hasClass('active')){
              return false;
            } else {
              var currentPage = $(this).index();
              console.log('Tu cliques sur ' + currentPage);
              $('.pagination li').removeClass('active');
              $(this).addClass('active');
              $('.list-rdv').hide();
              var grandTotal = limitPerPage * currentPage;
              for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $('.list-rdv:eq(' + i + ')').show();
              }
            }
            console.log(currentPage)
          });
          $('#next-page').on('click', function() {
            var currentPage = $('.pagination li.active').index();
            if (currentPage === totalPages) {
              return false;
            } else {
              currentPage++;
              $('.pagination li').removeClass('active');
              $('.list-rdv').hide();
              var grandTotal = limitPerPage * currentPage;
              for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
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
              var grandTotal = limitPerPage * currentPage;
              for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
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
            console.log('test');
          });
        });
    },
    recherche (){
      this.checkedRecherche=true
      setTimeout(()=>{
        this.checkedRecherche=false
        this.memo = 0
        this.pagination()
      },1)
      this.checkedRechercheV=true
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
  margin-top: 60px;
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
