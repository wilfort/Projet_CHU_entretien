import {initializeApp} from 'firebase'
import Vue from 'vue'

// import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyA7UFFCyweqUpUjSSl6qb-0CMBROFev4pQ',
  authDomain: 'projet-chu-53f94.firebaseapp.com',
  databaseURL: 'https://projet-chu-53f94.firebaseio.com',
  projectId: 'projet-chu-53f94',
  storageBucket: 'projet-chu-53f94.appspot.com',
  messagingSenderId: '88441536423',
  appId: '1:88441536423:web:3e8684c922d55e85638082',
  measurementId: 'G-Y8C9H5LPQT'
})

const db = firebaseConfig.database()
console.log(db)
Vue.prototype.$db = db
// export const db = firebaseConfig.database()
// export const namesRefPatient = db.ref('Patient/')
// export const namesRefRdv = db.ref('Rdv/')
