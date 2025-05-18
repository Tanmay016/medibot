// Importing Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHUx1Q1ja3q8q9v3PJR2i_Il9_NEJ15Ek",
  authDomain: "sign-in-and-sign-up-226cd.firebaseapp.com",
  projectId: "sign-in-and-sign-up-226cd",
  storageBucket: "sign-in-and-sign-up-226cd.firebasestorage.app",
  messagingSenderId: "360358238492",
  appId: "1:360358238492:web:339ff32917bb7b528002d9"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Initializing Firebase Authentication and Firestore
const auth = getAuth();
const db = getFirestore();

// Handle Sign-Up Form Submission
document.getElementById('sign-up-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('sign-up-username').value;
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  // Sign Up User
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account Created Sucessfully...")

      // Saving the username to Firebase
      addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email
      })
        .then(() => {
          alert("User Registered Successfully!");
          console.log("User Registered:", user);
        })
        .catch((error) => {
          console.error("Error adding user data: ", error);
          alert("Error during registration: " + error.message);
        });
    })
    .catch((error) => {
      console.error("Error during sign-up:", error.message);
      alert("Sign-Up Failed: " + error.message);
    });
});

// Handle Sign-In Form Submission
document.getElementById('sign-in-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;

  // Sign In User
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login Successful!");
      onclick = window.location.href='buyer_seller.html'
      console.log("User Logged In:", user);
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.message);
      alert("Sign-In Failed: " + error.message);
    });
});
