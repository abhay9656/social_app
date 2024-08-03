// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjx2OLu7o46DtNyZPm_kXbxKmNE8P7I0M",
  authDomain: "learning-react-native-ebe34.firebaseapp.com",
  projectId: "learning-react-native-ebe34",
  storageBucket: "learning-react-native-ebe34.appspot.com",
  messagingSenderId: "697358345780",
  appId: "1:697358345780:web:8370a91a2bb40c6b808c61",
  measurementId: "G-GRCF2XWX48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);