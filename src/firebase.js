// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9BXyE9Ga3vX116eArAiEqt-IyQl9hSn0",
  authDomain: "fantaastadb-a8383.firebaseapp.com",
  projectId: "fantaastadb-a8383",
  storageBucket: "fantaastadb-a8383.appspot.com",
  messagingSenderId: "800739546733",
  appId: "1:800739546733:web:791e0148f2832999b01164",
  databaseURL: "https://fantaastadb-a8383-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);