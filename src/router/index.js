import { createRouter, createWebHistory } from 'vue-router'

import SignupView from '../views/usuarios/SignupView.vue'
import LoginView from '../views/usuarios/LoginView.vue'

import LayoutView from '../views/LayoutView.vue'
import HomeView from '../views/HomeView.vue'

import CocherasList from '../views/cocheras/CocherasList.vue'
import CocherasForm from '../views/cocheras/CocherasForm.vue'
import CocherasView from '../views/cocheras/CocherasView.vue'

import VehiculosList from '../views/vehiculos/VehiculosList.vue'
import VehiculosForm from '../views/vehiculos/VehiculosForm.vue'
import VehiculosView from '../views/vehiculos/VehiculosView.vue'

import PublicacionesForm from '../views/publicaciones/PublicacionesForm.vue'
import PublicacionesView from '../views/publicaciones/PublicacionesView.vue'
import PublicacionesList from '../views/publicaciones/PublicacionesList.vue'

import ConversacionView from '../views/conversaciones/ConversacionView.vue'
import ConversacionesList from '../views/conversaciones/ConversacionesList.vue'

import TransaccionesList from '../views/transacciones/TransaccionesList.vue'

import AyudaView from '../views/AyudaView.vue'
import VersionView from '../views/VersionView.vue'
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
          component: HomeView,
          redirect: '/publicaciones/ofertas/otros'
        },
        {
          path: '/ayuda',
          name: 'ayuda',
          component: AyudaView
        },
        {
          path: '/version',
          name: 'version',
          component: VersionView
        },
        // COCHERAS
        {
          path: '/cocheras',
          name: 'cocherasList',
          component: CocherasList
        },
        {
          path: '/cocheras/alta',
          name: 'cocherasAlta',
          component: CocherasForm
        },
        {
          path: '/cocheras/:id',
          name: 'cocherasView',
          component: CocherasView
        },
        {
          path: '/cocheras/:id/editar',
          name: 'cocherasEdit',
          component: CocherasForm
        },

        // VEHICULOS
        {
          path: '/vehiculos',
          name: 'vehiculosList',
          component: VehiculosList
        },
        {
          path: '/vehiculos/alta',
          name: 'vehiculosAlta',
          component: VehiculosForm
        },
        {
          path: '/vehiculos/:id',
          name: 'vehiculosView',
          component: VehiculosView
        },
        {
          path: '/vehiculos/:id/editar',
          name: 'vehiculosEdit',
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

        // TRANSACCIONES
        {
          path: '/transacciones',
          name: 'transaccionesList',
          component: TransaccionesList
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
