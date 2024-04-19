
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAe4ZJIvYCqjc5DKDxdEaoxuYY4pvaG2iU",
  authDomain: "real-time-chat-64c35.firebaseapp.com",
  databaseURL: "https://real-time-chat-64c35-default-rtdb.firebaseio.com",
  projectId: "real-time-chat-64c35",
  storageBucket: "real-time-chat-64c35.appspot.com",
  messagingSenderId: "274988637903",
  appId: "1:274988637903:web:1671cdedca9f57ab5421ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);