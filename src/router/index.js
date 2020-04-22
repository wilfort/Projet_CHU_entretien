import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accueil from '@/components/Accueil'
import AgendaCHU from '@/components/AgendaCHU'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/AgendaCHU',
      name: 'AgendaCHU',
      component: AgendaCHU
    }
  ]
})
