import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project
// See: https://firebase.google.com/docs/web/learn-more#config-object
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
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

let formSignin = document.getElementById('formSignIn');
formSignin.addEventListener('submit', function(event) {
  event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  // console.log(email, password);
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('displayName', auth.currentUser.displayName);
      alert("Sign In Successfully!");
      window.location.href = '/index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorMessage} (Code: ${errorCode})`);
    });
});
