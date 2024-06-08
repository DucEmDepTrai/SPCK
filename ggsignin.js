import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const auth = getAuth(app);

// Function to handle Google Sign-In
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log("User signed in: ", user);
      alert(`Welcome, ${user.displayName}!`);
      // Optionally, redirect the user to another page
      window.location.href = '/index.html';
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Error signing in with Google: ", errorMessage);
      alert(`Error: ${errorMessage}`);
    });
}

// Add event listener to the button
document.addEventListener("DOMContentLoaded", () => {
  const googleSignInButton = document.getElementById('googleSignInButton');
  googleSignInButton.addEventListener('click', signInWithGoogle);
});
