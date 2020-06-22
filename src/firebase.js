import { firebaseConfig } from "./firebaseConfig";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const updateStorage = (user, lib) => {
  db.collection("users").doc(user.uid).set({
    todosLibrary: lib,
  });
};

export { db, auth, updateStorage };
