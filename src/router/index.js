import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/sesiones/SignupView.vue'
import LoginView from '../views/sesiones/LoginView.vue'
import LayoutView from '../views/LayoutView.vue'
import HomeView from '../views/HomeView.vue'

import CocherasList from '../views/cocheras/CocherasList.vue'
import CocherasForm from '../views/cocheras/CocherasForm.vue'
import VehiculosList from '../views/vehiculos/VehiculosList.vue'
import VehiculosForm from '../views/vehiculos/VehiculosForm.vue'
import PublicacionesHome from '../views/publicaciones/PublicacionesHome.vue'
import PublicacionesForm from '../views/publicaciones/PublicacionesForm.vue'
import PublicacionesView from '../views/publicaciones/PublicacionesView.vue'
import PublicacionesVisualizar from '../views/publicaciones/PublicacionesVisualizar.vue'
import MisPublicaciones from '../views/publicaciones/MisPublicaciones.vue'

import ConversacionView from '../views/conversaciones/ConversacionView.vue'

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
          component: HomeView
          // redirect: 'app'
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
          path: '/publicaciones',
          name: 'publicacionesList',
          component: PublicacionesHome,
          redirect: '/publicaciones/ofertas',
          children: [
            {
              path: '/publicaciones/ofertas',
              name: 'publicacionesOfertas',
              component: PublicacionesVisualizar
            },
            {
              path: '/publicaciones/pedidos',
              name: 'publicacionesPedidos',
              component: PublicacionesVisualizar
            },
            {
              path: '/publicaciones/misPublicaciones',
              name: 'misPublicaciones',
              component: MisPublicaciones
            }
          ]
        },
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
    }
  ]
})

export default router
