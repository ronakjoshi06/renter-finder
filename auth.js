import { auth } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 🔹 Pehle try signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created & Logged In");
        window.location.href = "owner.html";
      })
      .catch((error) => {

        // 🔹 Agar email already hai toh login try karo
        if (error.code === "auth/email-already-in-use") {

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
