// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import '../static/Semantic-UI-CSS-master/semantic.min.js'
import '../static/Semantic-UI-CSS-master/semantic.min.css'
import '../static/css/l_zoom.css'
import '../static/css/animate.min.css'
import '../static/js/l_zoom.min.js'
import '../static/js/l_drag.min.js'
import Icon from 'vue2-svg-icon/Icon.vue'
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
