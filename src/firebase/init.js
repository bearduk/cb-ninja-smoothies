import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2PtnSyWEZ8O6lX9P81RvYNt_vhLj7v1o",
    authDomain: "cb-ninja-smoothies.firebaseapp.com",
    databaseURL: "https://cb-ninja-smoothies.firebaseio.com",
    projectId: "cb-ninja-smoothies",
    storageBucket: "cb-ninja-smoothies.appspot.com",
    messagingSenderId: "846064288241"
  };
  
  // adding a const name for this
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({timestampsInSnapshots: true});

  // export firebase database so you can interact with it elsewhere
  export default firebaseApp.firestore();