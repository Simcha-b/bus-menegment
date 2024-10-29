// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlpQFp3Q6_Ob6mQ8emS_biimD_INfARNo",
  authDomain: "bus-management-1c3d2.firebaseapp.com",
  projectId: "bus-management-1c3d2",
  storageBucket: "bus-management-1c3d2.appspot.com",
  messagingSenderId: "671035929507",
  appId: "1:671035929507:web:abbd3b3d57c693c912a016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
