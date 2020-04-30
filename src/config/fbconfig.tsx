import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDPPCkVKRDcH0uQ_21lzuAMT-xuWABNXuU",
  authDomain: "codeappblog.firebaseapp.com",
  databaseURL: "https://codeappblog.firebaseio.com",
  projectId: "codeappblog",
  storageBucket: "codeappblog.appspot.com",
  messagingSenderId: "1011837886861",
  appId: "1:1011837886861:web:c297fe9724f0fd8ade1dc4",
  measurementId: "G-4RY9NC4F16",
};

const db = !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();
const storage = firebase.storage();

export { storage, db as default };
