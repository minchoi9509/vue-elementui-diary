// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import ElementUI from 'element-ui' // ElementUI 가져오기
import 'element-ui/lib/theme-chalk/index.css' // ElementUI의 css 가져오기
import locale from 'element-ui/lib/locale/lang/ko' // ElementUI 언어 설정 - ko

Vue.use(ElementUI, {locale}) // ElementUI를 vue에 등록

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})