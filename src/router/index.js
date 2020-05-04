import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/Accueil'
import AgendaJ from '@/components/AgendaJ'
import AgendaS from '@/components/AgendaS'
import AgendaM from '@/components/AgendaM'
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
      component: Recherche,
      props: true
    },
    {
      path: '/Agenda/:hopital',
      name: 'AgendaJ',
      component: AgendaJ,
      props: true
    },
    {
      path: '/AgendaS/:hopital',
      name: 'AgendaS',
      component: AgendaS,
      props: true
    },
    {
      path: '/AgendaM/:hopital',
      name: 'AgendaM',
      component: AgendaM,
      props: true
    },
    {
      path: '/NewRdv',
      name: 'NewRdv',
      component: NewRdv
    }
  ]
})
