import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail }  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCdWvp3KkXa51BxNq-ndHSGfZbUXnEtZyg",
  authDomain: "spck-38149.firebaseapp.com",
  databaseURL: "https://spck-38149-default-rtdb.firebaseio.com",
  projectId: "spck-38149",
  storageBucket: "spck-38149.appspot.com",
  messagingSenderId: "251672017078",
  appId: "1:251672017078:web:ccd697a587fa6ee1b60e17",
  measurementId: "G-9DEEW17XFN"
};
// Initialize Firebase
const app = initializeApp (firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
let forgetpassword = document.getElementById('forget_password')
forgetpassword.addEventListener("submit", function(event){
    event.preventDefault();
    let email = document.getElementById('email').value;
    sendPasswordResetEmail(auth, email)
   .then(() => {
    // Password reset email sent!
    // ..
    alert("Password reset email sent.Check email")
    window.location.href = '/signin.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
})
