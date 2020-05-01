import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Accueil from '@/components/Accueil'
import AgendaJCHU from '@/components/AgendaJCHU'
import AgendaSCHU from '@/components/AgendaSCHU'
import AgendaMCHU from '@/components/AgendaMCHU'
import AgendaJCNDG from '@/components/AgendaJCNDG'
import AgendaSCNDG from '@/components/AgendaSCNDG'
import AgendaMCNDG from '@/components/AgendaMCNDG'
import AgendaJGHDC from '@/components/AgendaJGHDC'
import AgendaSGHDC from '@/components/AgendaSGHDC'
import AgendaMGHDC from '@/components/AgendaMGHDC'
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
      path: '/AgendaCNDG',
      name: 'AgendaCNDG',
      component: AgendaJCNDG
    },
    {
      path: '/AgendaSCNDG',
      name: 'AgendaSCNDG',
      component: AgendaSCNDG
    },
    {
      path: '/AgendaMCNDG',
      name: 'AgendaMCNDG',
      component: AgendaMCNDG
    },
    {
      path: '/AgendaGHDC',
      name: 'AgendaGHDC',
      component: AgendaJGHDC
    },
    {
      path: '/AgendaSGHDC',
      name: 'AgendaSGHDC',
      component: AgendaSGHDC
    },
    {
      path: '/AgendaMGHDC',
      name: 'AgendaMGHDC',
      component: AgendaMGHDC
    },
    {
      path: '/NewRdv',
      name: 'NewRdv',
      component: NewRdv
    }
  ]
})
