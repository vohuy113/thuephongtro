// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZGDRYRAp39Fa5AuG16RBM72mYMB4RGdA",
  authDomain: "internal-chat-5721c.firebaseapp.com",
  databaseURL: "https://internal-chat-5721c-default-rtdb.firebaseio.com",
  projectId: "internal-chat-5721c",
  storageBucket: "internal-chat-5721c.appspot.com",
  messagingSenderId: "204511072104",
  appId: "1:204511072104:web:6f9f3f24169eb9632d90dd",
  measurementId: "G-BN0KPH06KC",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export const db = getFirestore(app);
export default app;
//export default database;
