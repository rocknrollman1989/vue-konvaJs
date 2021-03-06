import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/main.scss'

import './helpers/storageControlFunc';

Vue.use(BootstrapVue)
Vue.use(VueKonva)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
