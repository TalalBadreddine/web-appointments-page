import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyBzSB-I0oqQy_PS5vnsCO21h9l3mNlHPaA",
    authDomain: "appointment-crud.firebaseapp.com",
    databaseURL: "https://appointment-crud-default-rtdb.firebaseio.com",
    projectId: "appointment-crud",
    storageBucket: "appointment-crud.appspot.com",
    messagingSenderId: "240486821887",
    appId: "1:240486821887:web:83c134dc4f1f8d6ba441ca"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();