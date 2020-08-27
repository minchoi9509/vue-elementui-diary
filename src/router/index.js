import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store/store'

import Login from '@/components/Login'
import Diary from '@/components/Diary'
import DiaryList from '@/components/DiaryList'
import DiaryDetail from '@/components/DiaryDetail'
import DiaryWrite from '@/components/DiaryWrite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/diary', 
      component: Diary, 
      /*
        to: 라우트 대상
        from: 현재 라우트로 오기전 라우트
        next: 훅 이동 관련 
       */
      beforeEnter: (to, from, next) => {
        // user name 없는 경우 logign 화면으로 돌아오기 
        if(store.state.user != '') {
          next(); 
        }else {
          alert("로그인 후 이용해주세요.");
          next('/login')
        }
      },     
      // 중첩 라우터 > /diary 하위 링크
      children: [
        {
          path: 'list',
          component: DiaryList
        },
        {
          path: 'write',
          component: DiaryWrite
        },
        {
          path: ':index',
          component: DiaryDetail
        }
      ]
    }
  ]
})
