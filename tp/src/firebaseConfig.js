import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAZopMyB0CLE3eIGfYZDJUihVoje983i2M",
    authDomain: "practica-69c7f.firebaseapp.com",
    projectId: "practica-69c7f",
    storageBucket: "practica-69c7f.appspot.com",
    messagingSenderId: "12946961460",
    appId: "1:12946961460:web:1473f273c65d590b010661"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const db = getFirestore(app);

