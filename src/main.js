// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './config/firebase'
import './config/vuefire'
// import './config/vuesax'

import './config/bootstrapVue'
import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable no-new */
// Vue.config.productionTip = false
window.$ = require('jquery')
window.JQuery = require('jquery')
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
