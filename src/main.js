import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "@/plugins/firebase";
import vuetify from './plugins/vuetify';
import TradingVue from 'trading-vue-js';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import { firestorePlugin } from 'vuefire'

const apiToken = 'c088o2748v6plm1egchg';

Vue.prototype.$stockInfoApi = `https://finnhub.io/api/v1/quote?token=${apiToken}&symbol=`,
Vue.prototype.$webSocket = `wss://ws.finnhub.io?token=${apiToken}`;
Vue.prototype.$specificStockData = `https://finnhub.io/api/v1/stock/candle?&resolution=D&from=1405543327&to=1610960764&token=${apiToken}&symbol=`

Vue.use(VueAxios, axios)

Vue.use(TradingVue);
// Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
