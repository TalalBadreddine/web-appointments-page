import * as firebase from "firebase";  
      
var firebaseConfig = {
    apiKey: "AIzaSyAyp2ZMaL1iuYv_PyZ31ErMSseS4G_NUiU",
    authDomain: "appointments-crud.firebaseapp.com",
    projectId: "appointments-crud",
    storageBucket: "appointments-crud.appspot.com",
    messagingSenderId: "91707071342",
    appId: "1:91707071342:web:a94add3e3c3335dfd53f7f",
    measurementId: "G-PSD7TD14TH"
}; 
    
var fireDb = firebase.initializeApp(firebaseConfig);  
    
export default fireDb.database().ref();  
