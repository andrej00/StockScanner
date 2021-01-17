import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app';
import "firebase/auth"

import Login from "@/components/Login";
import Register from "@/components/Register";
import Stocks from "@/views/Stocks";
import StocksAdmin from "@/views/StocksAdmin";

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
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('stocks');
  else next();
});

export default router;