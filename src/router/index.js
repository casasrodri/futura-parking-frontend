import { createRouter, createWebHistory } from 'vue-router'

import SignupView from '../views/sesiones/SignupView.vue'
import LoginView from '../views/sesiones/LoginView.vue'

import LayoutView from '../views/LayoutView.vue'

import CocherasList from '../views/cocheras/CocherasList.vue'
import CocherasForm from '../views/cocheras/CocherasForm.vue'

import VehiculosList from '../views/vehiculos/VehiculosList.vue'
import VehiculosForm from '../views/vehiculos/VehiculosForm.vue'

import PublicacionesForm from '../views/publicaciones/PublicacionesForm.vue'
import PublicacionesView from '../views/publicaciones/PublicacionesView.vue'
import PublicacionesList from '../views/publicaciones/PublicacionesList.vue'

import ConversacionView from '../views/conversaciones/ConversacionView.vue'
import ConversacionesList from '../views/conversaciones/ConversacionesList.vue'

import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'principal',
      component: LayoutView,
      children: [
        {
          path: '/',
          name: 'home',
          // component: PublicacionesHome,
          redirect: '/publicaciones/ofertas/otros'
        },
        // COCHERAS
        {
          path: '/cocheras',
          name: 'cocherasList',
          component: CocherasList
        },
        {
          path: '/cocheras/:id',
          name: 'cocherasForm',
          component: CocherasForm
        },

        // VEHICULOS
        {
          path: '/vehiculos',
          name: 'vehiculosList',
          component: VehiculosList
        },
        {
          path: '/vehiculos/:id',
          name: 'vehiculosForm',
          component: VehiculosForm
        },

        // PUBLICACIONES
        {
          path: '/publicaciones/:tipoPub/:tipoVis',
          // tipoPub: ofertas | pedidos
          // tipoVis: otros | mias
          name: 'publicacionesList',
          component: PublicacionesList
        },
        // {
        //   path: '/publicaciones',
        //   name: 'publicacionesList',
        //   component: PublicacionesHome,
        //   redirect: '/publicaciones/ofertas/otros',
        //   children: [
        //     {
        //       path: '/publicaciones/ofertas',
        //       name: 'publicacionesOfertas',
        //       component: PublicacionesVisualizar
        //     },
        //     {
        //       path: '/publicaciones/pedidos',
        //       name: 'publicacionesPedidos',
        //       component: PublicacionesVisualizar
        //     },
        //     {
        //       path: '/publicaciones/misPublicaciones',
        //       name: 'misPublicaciones',
        //       component: MisPublicaciones
        //     }
        //   ]
        // },
        {
          path: '/publicaciones/alta',
          name: 'publicacionesAlta',
          component: PublicacionesForm
        },
        {
          path: '/publicaciones/editar/:id',
          name: 'publicacionesForm',
          component: PublicacionesForm
        },
        {
          path: '/publicaciones/ver/:id',
          name: 'publicacionesView',
          component: PublicacionesView
        },

        // MENSAJES
        {
          path: '/conversaciones',
          name: 'conversacionesList',
          component: ConversacionesList
        },
        {
          path: '/conversaciones/:id',
          name: 'conversacionView',
          component: ConversacionView
        }
      ]
    },
    {
      path: '/ingreso',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registro',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ]
})

export default router
