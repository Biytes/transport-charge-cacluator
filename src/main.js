import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import store from '@/store'
import i18n from '@/lang'
import uView from 'uview-ui';

require('@/mixins')

Vue.use(uView);
Vue.use(Vuex);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store: store(),
    i18n,
    ...App
})
app.$mount()
