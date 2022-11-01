const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDMfbvyHfazyGUwDbhJu-m4Lx6Jfb81yCc",
    authDomain: "zibara-e90ef.firebaseapp.com",
    projectId: "zibara-e90ef",
    storageBucket: "zibara-e90ef.appspot.com",
    messagingSenderId: "339503700835",
    appId: "1:339503700835:web:36fa8a35cd933bbd439156",
    measurementId: "G-4WEXG1CERR"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("products");
module.exports = User;
