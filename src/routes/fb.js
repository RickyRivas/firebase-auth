// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvdbheWZtTOSwOqYv6kQ26sTh-M8c9e1o",
  authDomain: "sveltekit-auth-432ee.firebaseapp.com",
  projectId: "sveltekit-auth-432ee",
  storageBucket: "sveltekit-auth-432ee.appspot.com",
  messagingSenderId: "956352395240",
  appId: "1:956352395240:web:c0660d90be72ee2271565d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;