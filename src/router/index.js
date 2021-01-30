import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app';
import "firebase/auth"
import actions from "../store/actions.js";
import getters from "../store/getters.js";
import store from "../store/index.js"

import Login from "@/components/Login";
import Register from "@/components/Register";
import Stocks from "@/views/Stocks";
import StocksAdmin from "@/views/StocksAdmin";
import Stock from "@/views/Stock";
import Portfolio from "@/views/Portfolio";
import News from "@/views/News";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: Stocks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/stocksadmin",
    name: "StocksAdmin",
    component: StocksAdmin,
    meta: {
      requiresAuth: true
    },
    // beforeEnter: (to, from, next) =>
    // {
    //   store.dispatch('getUser').then(response => {
    //       // the above state is not available here, since it
    //       // it is resolved asynchronously in the store action
    //   }, error => {
    //       // handle error here
    //   })         
    // }
    beforeEnter: (to, from, next) => {
      console.log(store.getters.getUser.database.role == "admin");
      if (store.getters.getUser.database.role == "admin") {
        next();
      }
      store.watch(() => store.getters.getUser, userInfo => {
        if (userInfo.database.role == "admin") {
          console.log(userInfo.database.role);
          next("/stocksadmin");
        } else {
          next("/stocks");
        }
      })
    }
  },
  {
    path: '/stocks/:id',
    name: "Stock",
    component: Stock,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
    meta: {
      requiresAuth: true,
      title: 'Portfolio',
    }
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      requiresAuth: true,
      title: 'Vijesti'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function (to, from, next) {
  Vue.nextTick(() => {
    document.title = to.meta.title || 'StockScanner';
}); 
  // store.watch(() => store.getters.getUser, userInfo => {
  //   if (userInfo.database.role == "admin" && to.fullPath == "/stocksaddmin") {
  //     console.log(userInfo.database.role);
  //     next();
  //   } else {
  //     next("/stocks");
  //   }
  // })
  // console.log(store.getters.getUser);
  // if (store.getters.userInfo.isAdmin === null) {
  //   const watcher = store.watch(store.getters.userInfo.isAdmin, isAdmin => {
  //     watcher(); // stop watching
  //     if (isAdmin) next();
  //     else next('/');
  //   });
  // }
  // else if (store.getters.userInfo.isAdmin) next();
  // else next('/');


  //   store.dispatch('getUser').then(() => {
  //     console.log('pfeiwuhfewpu');
  //  });
  // setTimeout(function () {
  //   console.log(store.getters.getUser);
  // }, 3000);
  // console.log(getters);
  // console.log(actions.signOutAction);
  if (getters.getUser && (to.fullPath == "/login" || to.fullPath == "/register")) {
    // actions.signOutAction;
    // this.actions.dispatch('signOutAction')
    // console.log('fpeiwuhfewpiufhewpfuwehfpewuh')
    // console.log(this.$store);
    // console.log(getters.getUser);
  }
  next();
});

export default router;