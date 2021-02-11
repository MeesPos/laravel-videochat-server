import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCRe61Or7bVQhqDxczKV9eVSKPMemCfec0",
  authDomain: "secondes-2d06a.firebaseapp.com",
  databaseURL: "https://secondes-2d06a-default-rtdb.firebaseio.com",
  projectId: "secondes-2d06a",
  storageBucket: "secondes-2d06a.appspot.com",
  messagingSenderId: "834284389767",
  appId: "1:834284389767:web:d3f46668bf75a713537f22",
  measurementId: "G-8KK10V0ZBS"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 firebase.auth().languageCode = 'nl'