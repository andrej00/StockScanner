import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "@/plugins/firebase";
import vuetify from './plugins/vuetify';
import TradingVue from 'trading-vue-js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { sync } from 'vuex-router-sync';
import { DateTime } from 'luxon';

const apiToken = 'c0amnqv48v6sc0grm1mg';
// const apiToken = 'sandbox_c08o8mf48v6oofbnk5k0'; // free version, incorrect data

function timeInMillis() {
  return DateTime.local().ts;
}

Vue.prototype.$stockInfoApi = `https://finnhub.io/api/v1/quote?token=${apiToken}&symbol=`,
Vue.prototype.$webSocket = `wss://ws.finnhub.io?token=${apiToken}`;
Vue.prototype.$specificStockData = `https://finnhub.io/api/v1/stock/candle?&resolution=D&from=1405543327&to=${timeInMillis()}&token=${apiToken}&symbol=`
Vue.prototype.$newsApi = `https://finnhub.io/api/v1/news?category=general&token=${apiToken}`;

// contains VueRouter instance and route definitions
// contains Vuex.Store instance. I guess this is './vuex/store' in your example?

// sync the router with vuex store using vuex-router-sync

// sync(store, router);

Vue.use(VueAxios, axios)

Vue.use(TradingVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
