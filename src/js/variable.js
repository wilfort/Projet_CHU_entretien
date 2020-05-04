import Vue from 'vue'

var listeData = {
  dateJ: new Date(), // la date du jour
  mois: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  semaine: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  examenM: [// liste des différent types d'examen medicale
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
  heureRDV: [// liste des plages horaire des Rdv
    '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:30'],
  hopital: ['CHU', 'CNDG', 'GHDC'] // liste des différents hôpitaux
}

Vue.prototype.$listeData = listeData
