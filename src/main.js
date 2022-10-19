import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import store from '@/store'
import uView from 'uview-ui';

require('@/mixins')

Vue.use(uView);
Vue.use(Vuex);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store: store(),
    ...App
})
app.$mount()
