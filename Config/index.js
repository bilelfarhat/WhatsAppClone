// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgwLnj-qOyDAwYJLi0_2PXozK46PMABMo",
  authDomain: "whatsapp-853e8.firebaseapp.com",
  databaseURL: "https://whatsapp-853e8-default-rtdb.firebaseio.com",
  projectId: "whatsapp-853e8",
  storageBucket: "whatsapp-853e8.appspot.com",
  messagingSenderId: "722049974888",
  appId: "1:722049974888:web:660cb20cff1ee4793431dd"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;