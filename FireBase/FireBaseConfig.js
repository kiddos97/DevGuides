// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
i//mport { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwlafXsDN7xpwu-zSaidhdRlzCVK9dagE",
  authDomain: "devguides-1114d.firebaseapp.com",
  projectId: "devguides-1114d",
  storageBucket: "devguides-1114d.appspot.com",
  messagingSenderId: "1090463216879",
  appId: "1:1090463216879:web:f9199d3462d35d0eb8d71a",
  measurementId: "G-4RK1QX2NH0"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const analytics = getAnalytics(app);