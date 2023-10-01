import { createRouter, createWebHistory } from 'vue-router'
import RegistroUsuarioVista from '../views/RegistroUsuarioVista.vue'
import PrincipalVista from '../views/PrincipalVista.vue'
import InicioSesionVista from '../views/InicioSesionVista.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/registro',
      name: 'signup',
      component: RegistroUsuarioVista
    },
    {
      path: '/',
      name: 'principal',
      component: PrincipalVista,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/ingresar',
      name: 'login',
      component: InicioSesionVista
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
