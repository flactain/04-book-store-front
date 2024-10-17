import { createRouter, createWebHistory } from 'vue-router'
import TopView from '@/presentation/views/TopView.vue'
import NotFound from '@/presentation/views/NotFound.vue'

import { useAuthStore } from '@/store/auth'
import LoginView from '@/presentation/views/LoginView.vue'
import HomeView from '@/presentation/views/HomeView.vue'
import RentReturnView from '@/presentation/views/RentReturnView.vue'
import RentalsView from '@/presentation/views/RentalsView.vue'
import ResultView from '@/presentation/views/ResultView.vue'
import BookListView from '@/presentation/views/BookListView.vue'
import UserRegister from '@/presentation/views/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TopView,
      meta: { requiredAuth: false },
      name: 'top'
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiredAuth: false },
      name: 'login'
    },
    {
      path: '/user/register',
      component: UserRegister,
      meta: { requiredAuth: false },
      name: 'userRegister'
    },
    {
      path: '/home',
      component: HomeView,
      meta: { requiredAuth: true },
      name: 'home'
    },
    {
      path: '/:rentOrReturn',
      component: RentReturnView,
      meta: { requiredAuth: true },
      name: 'rent'
    },
    {
      path: '/:rentOrReturn/result',
      component: ResultView,
      meta: { requiredAuth: true },
      name: 'result'
    },

    {
      path: '/rentals',
      component: RentalsView,
      meta: { requiredAuth: true },
      name: 'rentals'
    },
    {
      path: '/books',
      component: BookListView,
      meta: { requiredAuth: true },
      name: 'books'
    },
    {
      path: '/:catchAll(.*)*',
      component: NotFound,
      name: 'notFound',
      props: true
    }
  ]
})

router.beforeEach((to) => {
  console.log('router.beforeEach')

  const auth = useAuthStore()
  console.log('auth.userIdがない; ' + !auth.isLogin.value)
  console.log('to.meta:' + to.meta.requiredAuth)
  console.log('to.info:' + to)
  console.log(to)
  console.log(to.meta.requiredAuth && !auth.isLogin.value)

  if (to.meta.requiredAuth && !auth.isLogin.value) {
    console.log('out aUTH IN')
    return {
      path: '/'
    }
  } else {
    console.log('else in')
  }
})

export default router
