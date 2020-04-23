<template>
  <div><i class="bx bxs-phone-call"></i>
    <form action="">
      <div>
        Est-il un nouveau patient ? :
        <input type="radio" id="NON" value="non" v-model="checkPatient">
        <label for="NON">Non</label>
        <input type="radio" id="OUI" value="oui" v-model="checkPatient">
        <label for="OUI">Oui</label>
      </div>
      <div>
        <h1>Rdv :</h1>
        <div>Date : <input type="date" v-model="newRdv['date']"></div>
        <div>Choisissez l'Examen ou les Examens: <select v-model="newRdv['examen']">
            <option disabled value=""></option>
            <option v-for="elemEM in examenM" :key='elemEM.id' :value='elemEM'>{{elemEM}}</option>
          </select>
        </div>
        <div>Heure : <input type="time" v-model="newRdv['heure']" placeholder = "00:00"></div>
        <div>Choisissez l'Hôpital : <select v-model="newRdv['hopital']">
            <option disabled value=""></option>
            <option v-for="elemH in hopital" :key='elemH.id' :value='elemH'>{{elemH}}</option>
          </select>
        </div>
        <div v-if="checkPatient=='non'">
          Choisissez le Patient : <select v-model="newRdv['patient']">
            <option disabled value=""></option>
            <option v-for="elemP in patientList" :key='elemP.id' :value='elemP.id'>{{elemP.Nom}} {{elemP.Prenom}}</option>
          </select>
        </div>
        <div>Urgent : <select v-model="newRdv['urgent']">
            <option value="n">non</option>
            <option value="y">oui</option>
          </select>
        </div>
      </div>
      <div v-if="checkPatient==='oui'">
        <h1>Patient :</h1>
        <div>Nom : <input type="text" v-model="newPatient['Nom']"></div>
        <div>Prénom : <input type="text" v-model="newPatient['Prenom']"></div>
        <div>Sexe : <input type="text" v-model="newPatient['Sexe']"></div>
        <div>Date de naissance : <input type="date" v-model="newPatient['DateN']"></div>
        <div>Diabéte : <input type="text" v-model="newPatient['Diabete']"></div>
        <div>Poids : <input type="number" v-model="newPatient['Poids']"> kg</div>
        <div>Taille : <input type="number" v-model="newPatient['Taille']"> cm</div>
        <div>Niss : <input type="text" v-model="newPatient['Niss']"></div>
        <div>Téléphonr : <input type="tel" v-model="newPatient['Telephone']"></div>
      </div>
      <button v-on:click="addRdvList()">Nouveau RDV</button>
    </form>
    <vs-dialog not-close v-model="popupActive">
        <div class="con-form">
          <span @click="redic('AgendaCHU')"
              >
                CHU de Charleroi
             </span>
             <span @click="redic('AgendaCHU')"
              >
                GHDC
             </span>
             <span @click="redic('AgendaCHU')"
              >
                CNDG
             </span>
        </div>
      </vs-dialog>
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
      examenM: [
        'autre',
        'radio',
        'scanner',
        'IRM',
        'autre + radio',
        'autre + scanner',
        'autre + IRM',
        'radio + scanner',
        'radio + IRM',
        'scanner + IRM',
        'autre + radio + scanner',
        'autre + radio + IRM',
        'autre + scanner + IRM',
        'radio + scanner + IRM',
        'autre + radio + scanner + IRM'
      ],
      dateJ: new Date(),
      semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      hopital: ['CHU', 'CNDG', 'GHDC'],
      newRdv: {
        'date': '',
        'examen': '',
        'heure': '',
        'hopital': '',
        'patient': '',
        'urgent': 'n'},
      newPatient: {
        'DateN': '',
        'Diabete': '',
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
    redic: function (elem) {
      this.popupActive = !this.popupActive
      setTimeout(function () {
        window.location.href = '#/' + elem
      }, 10)
    },
    addRdvList: function () {
      let dateR = new Date(this.newRdv['date'])
      let mdateR = dateR.toLocaleDateString()
      mdateR = mdateR.replace(/\//gi, '')
      let heureR = this.newRdv['heure']
      heureR = heureR.replace(':', '')
      let chid = '' + this.newRdv['hopital'] + '' + mdateR + '' + heureR
      console.log(this.newRdv)
      this.$firebaseRefs.rdvList.child(chid).set(this.newRdv)
      this.popupActive = !this.popupActive
    },
    addPatientList: function () {
      this.$firebaseRefs.patientList.push(this.newPatient)
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
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
