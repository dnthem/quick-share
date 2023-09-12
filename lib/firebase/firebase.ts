// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQxaWl3kP7JBrO4eoZWCiIPd4WafmyTEY",
  authDomain: "quickshare-6922a.firebaseapp.com",
  projectId: "quickshare-6922a",
  storageBucket: "quickshare-6922a.appspot.com",
  messagingSenderId: "420183102601",
  appId: "1:420183102601:web:277e9a9aa63c24c8dca258",
  measurementId: "G-X21VB1FTHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);