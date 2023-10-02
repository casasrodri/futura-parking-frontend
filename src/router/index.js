import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LayoutView from '../views/LayoutView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

import CocherasList from '../views/cocheras/CocherasList.vue'
import CocherasForm from '../views/cocheras/CocherasForm.vue'
import VehiculosList from '../views/vehiculos/VehiculosList.vue'
import VehiculosForm from '../views/vehiculos/VehiculosForm.vue'

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
