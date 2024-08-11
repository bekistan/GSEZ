// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxIGrI92XmM8J5CmSphO1YH2Q66gp0sNM",
  authDomain: "gsez-a2384.firebaseapp.com",
  projectId: "gsez-a2384",
  storageBucket: "gsez-a2384.appspot.com",
  messagingSenderId: "1062514782591",
  appId: "1:1062514782591:web:ea276141d204ed6a5aaa4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 
const firestore = getFirestore(app);

export { app,auth,db ,storage,firestore};
