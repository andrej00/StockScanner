import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app';
import "firebase/auth"
import actions from "../store/actions.js";
import getters from "../store/getters.js";

import Login from "@/components/Login";
import Register from "@/components/Register";
import Stocks from "@/views/Stocks";
import StocksAdmin from "@/views/StocksAdmin";
import Stock from "@/views/Stock";
import Portfolio from "@/views/Portfolio";

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
    }
  },
  {
    path: '/stocks/:id', 
    name: "Stock",
    component: Stock
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(getters);
  // console.log(actions.signOutAction);
  if (getters.getUser && (to.fullPath == "/login" || to.fullPath == "/register")) {
    // actions.signOutAction;
    // this.actions.dispatch('signOutAction')

    // console.log('fpeiwuhfewpiufhewpfuwehfpewuh')
  }
  next();
});

export default router;