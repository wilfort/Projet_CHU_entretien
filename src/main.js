// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './config/firebase'// element de configuration
import './config/vuefire'
import './config/jquery'
import './config/bootstrapVue'
import './js/variable'

import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable no-new */
// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
