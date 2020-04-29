import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accueil from '@/components/Accueil'
import AgendaJCHU from '@/components/AgendaJCHU'
import AgendaSCHU from '@/components/AgendaSCHU'
import AgendaMCHU from '@/components/AgendaMCHU'
import NewRdv from '@/components/NewRdv'
import Recherche from '@/components/Recherche'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/Recherche',
      name: 'Recherche',
      component: Recherche
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
      path: '/AgendaSCHU',
      name: 'AgendaSCHU',
      component: AgendaSCHU
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
