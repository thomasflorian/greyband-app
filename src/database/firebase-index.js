// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhzZq5rnOPb-asISuG6TZavga2cJtC8jw",
  authDomain: "greyband-95809.firebaseapp.com",
  databaseURL: "https://greyband-95809-default-rtdb.firebaseio.com",
  projectId: "greyband-95809",
  storageBucket: "greyband-95809.appspot.com",
  messagingSenderId: "801372082184",
  appId: "1:801372082184:web:f4b6166286e68153ecc1bd",
  measurementId: "G-7739P7MZSE"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

// Initialize Firebase
const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db };