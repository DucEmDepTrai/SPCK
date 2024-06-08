import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let formSignup = document.getElementById('formSignUp');
formSignup.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value; 

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: firstName + " " + lastName
        }).then(() => {
          alert(`${firstName} ${lastName} Sign Up Successfully!!!`);
          window.location.href = '/signin.html';
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Error updating profile: ${errorMessage}`);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error creating user: ${errorMessage}`);
      });
});

