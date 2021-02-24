import firebase from "firebase/app";
import router from '../router/index.js'
import { db } from "../plugins/firebase";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);

const actions = {
  authAction({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          db.collection("users").doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
              user.database = doc.data();
              commit("setUser", user);
            } else {
              console.log("No such document!");
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);
            reject();
          });
        } else {
          commit("setUser", null);
        }
      });
  },
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(function (result) {
        db.collection("users").doc(result.user.uid).set({
          name: payload.displayName,
          email: result.user.email,
          image: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
          role: "user",
          portfolio: {aapl: 10, pfe: 3, tsla: 7},
          balanceUSD: 1000,
          id: result.user.uid,
        })
        return result.user.updateProfile({
          displayName: payload.displayName,
        });
      })
      .then(function () {
        router.push("stocks");
      })
      .catch(error => {
        commit("setError", error.message);
      });
  },
  signInAction({ commit, getters }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(function () {
        // router.push("stocks");
      })
      .catch(error => {
        commit("setError", error.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .then(function () {
        router.push("login");
      })
      .catch(error => {
        commit("setError", error.message);
      });
  }
};

export default actions;
