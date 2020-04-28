import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accueil from '@/components/Accueil'
import AgendaJCHU from '@/components/AgendaJCHU'
import AgendaMCHU from '@/components/AgendaMCHU'
import NewRdv from '@/components/NewRdv'

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
      component: AgendaJCHU
    },
    {
      path: '/AgendaMCHU',
      name: 'AgendaMCHU',
      component: AgendaMCHU
    },
    {
      path: '/NewRdv',
      name: 'NewRdv',
      component: NewRdv
    }
  ]
})
