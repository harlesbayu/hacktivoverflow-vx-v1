import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'QuestionsCollection',
          component: () => import('./components/contentComponent/questionComponent.vue')
        },
        {
          path: '/questions/create',
          name: 'CreateQuestions',
          component: () => import('./components/contentComponent/questionCreateComponents.vue')
        },
        {
          path: '/questions/update/:id',
          name: 'UpdateQuestions',
          component: () => import('./components/contentComponent/questionUpdateComponents.vue')
        },
        {
          path: '/questions/:id',
          name: 'FullPageQuestions',
          component: () => import('./components/contentComponent/fullpageQuestionComponent.vue')
        }
      ]
    }
  ]
})
