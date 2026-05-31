import { auth } from "./firebase-config.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firestore Initialization
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "owner.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Pehle signup try karega
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created & Logged In");
        window.location.href = "owner.html";
      })
      .catch((error) => {
  errorMsg.innerText = error.message;

        if (error.code === "auth/email-already-in-use") {

          // Agar already exist karta hai toh login karega
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              alert("Login Successful");
              window.location.href = "owner.html";
            })
            .catch((loginError) => {
              alert(loginError.message);
            });

        } else {
          alert(error.message);
        }
      });

  });

});
