import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVj9YBQA4SDMkFQP22DGhL5DWRuipSUTk",
    authDomain: "snapchat-clone-44375.firebaseapp.com",
    projectId: "snapchat-clone-44375",
    storageBucket: "snapchat-clone-44375.appspot.com",
    messagingSenderId: "275979942965",
    appId: "1:275979942965:web:171b18ca030324f57ec57c",
    measurementId: "G-H129EF9SHQ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };