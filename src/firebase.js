// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl6FF2hrhV2KaOtEgSocsAemNz7mvsynQ",
  authDomain: "womanup-crud.firebaseapp.com",
  projectId: "womanup-crud",
  storageBucket: "womanup-crud.appspot.com",
  messagingSenderId: "389967193807",
  appId: "1:389967193807:web:a13d8d063cd66781f579ba",
  measurementId: "G-8X092X5RCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
