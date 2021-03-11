// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import firebase from 'firebase';
import firebase from "firebase/app"
import "firebase/auth"


const app = firebase.initializeApp({
    apiKey: "AIzaSyDb-7vwEFo-qnomJX1IGI7vISHExpV21G8",
    authDomain: "appointments-a4dbf.firebaseapp.com",
    databaseURL: "https://appointments-a4dbf-default-rtdb.firebaseio.com",
    projectId: "appointments-a4dbf",
    storageBucket: "appointments-a4dbf.appspot.com",
    messagingSenderId: "160846819300",
    appId: "1:160846819300:web:8b23b15d4e610cb430a1f1",
    measurementId: "G-B63T1NHPSH"
  });
  export const auth = app.auth()
  export default app
