import firebase from "firebase/app";

// Import needed firebase modules
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCpEOUvpZAd7KvgiKx0k2VpmXjzfVWgzMs",
  authDomain: "stockscanner-c8675.firebaseapp.com",
  projectId: "stockscanner-c8675",
  storageBucket: "stockscanner-c8675.appspot.com",
  messagingSenderId: "1015129863089",
  appId: "1:1015129863089:web:39af5bcd78881059000390"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  }
)};

