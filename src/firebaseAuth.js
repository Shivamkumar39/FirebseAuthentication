// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCJzGPyZFtYvhdIHyw-ltaMGT48TcOHBc",
  authDomain: "blogging-986b4.firebaseapp.com",
  projectId: "blogging-986b4",
  storageBucket: "blogging-986b4.appspot.com",
  messagingSenderId: "385033512512",
  appId: "1:385033512512:web:eee7191e6d01646b4e21a5",
  measurementId: "G-3HCRB8V3XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export{app, auth}