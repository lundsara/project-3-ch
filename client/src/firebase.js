import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBPMjiE40joBYoT0daQqZs9QjWkyW1b1cQ",
    authDomain: "mood-diary-scl.herokuapp.com",
    databaseURL: "https://greatideasinc-1e532.firebaseio.com",
    projectId: "greatideasinc-1e532",
    storageBucket: "greatideasinc-1e532.appspot.com",
    messagingSenderId: "944510025836"
};
  firebase.initializeApp(config);


  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
