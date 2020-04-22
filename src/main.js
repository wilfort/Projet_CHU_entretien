// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import firebase from 'firebase'

Vue.config.productionTip = false
// const firebaseConfig = {
//   apiKey: "AIzaSyA7UFFCyweqUpUjSSl6qb-0CMBROFev4pQ",
//   authDomain: "projet-chu-53f94.firebaseapp.com",
//   databaseURL: "https://projet-chu-53f94.firebaseio.com",
//   projectId: "projet-chu-53f94",
//   storageBucket: "projet-chu-53f94.appspot.com",
//   messagingSenderId: "88441536423",
//   appId: "1:88441536423:web:3e8684c922d55e85638082",
//   measurementId: "G-Y8C9H5LPQT"
// }
// firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // firebase,
  components: { App },
  template: '<App/>'
})
