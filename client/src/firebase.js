import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC8WKGop100O1dkag5HvCzVAcm645u-cDI",
      authDomain: "project-3-93a3f.firebaseapp.com",
      databaseURL: "https://project-3-93a3f.firebaseio.com",
      projectId: "project-3-93a3f",
      storageBucket: "project-3-93a3f.appspot.com",
      messagingSenderId: "450244781662"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
