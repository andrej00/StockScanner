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
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/stocks'
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
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
    beforeEnter: (to, from, next) => {
      if (store.getters.getUser.database.role == "admin") {
        next();
      }
      store.watch(() => store.getters.getUser, userInfo => {
        if (userInfo.database.role == "admin") {
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
  },
  {
    path: "/",
    name: "Home",
    component: Home,
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

  console.log(to);


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isUserAuth) {
      next("/login");
    }
  } else {
    store.watch(() => store.getters.getUser, userInfo => {
      next("/stocks");
    })
  }
  next();
});

export default router;