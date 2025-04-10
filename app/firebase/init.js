// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0K0Bgh0gavBiDNYRxIfduOTkkgiAUTMo",
  authDomain: "fes-advance-intern.firebaseapp.com",
  projectId: "fes-advance-intern",
  storageBucket: "fes-advance-intern.firebasestorage.app",
  messagingSenderId: "337181337062",
  appId: "1:337181337062:web:c1c065fcb47b774442a227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();