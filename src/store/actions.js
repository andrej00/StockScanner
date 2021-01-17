import firebase from "firebase/app";
import router from '../router/index.js'

const actions = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
      } else {
        commit("setUser", null);
      }
    });
  },
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(function(result) {
        return result.user.updateProfile({
          displayName: payload.displayName,
        });
      })
      .then(function() {
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
      .then(function() {
        console.log("getters: ");
        console.log(getters);
        router.push("stocks");
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
      .then(function() {
        router.push("login");
      })
      .catch(error => {
        commit("setError", error.message);
      });
  }
};

export default actions;
