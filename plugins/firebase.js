// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfWPHZQaE2INyFuPIH2GPVbPG-AmL74aU",
  authDomain: "beebovocab.firebaseapp.com",
  projectId: "beebovocab",
  storageBucket: "beebovocab.appspot.com",
  messagingSenderId: "877191793479",
  appId: "1:877191793479:web:b34728027547f37f8d5a62",
  measurementId: "G-3YPZHG4DVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
