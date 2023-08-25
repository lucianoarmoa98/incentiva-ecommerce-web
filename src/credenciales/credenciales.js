// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAisS4PaSyQKsS9UxETIwxw_EfYy6xpQ",
  authDomain: "incentivaweb-9e378.firebaseapp.com",
  projectId: "incentivaweb-9e378",
  storageBucket: "incentivaweb-9e378.appspot.com",
  messagingSenderId: "291894976651",
  appId: "1:291894976651:web:1f509628464b7f8e12b48e"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;