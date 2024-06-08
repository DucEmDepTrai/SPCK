import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("displayName");
      window.location.reload();
    });
  };

  onAuthStateChanged(auth, (user) => {
    const inforElement = document.getElementById("information"); // Sửa thành ID của phần tử HTML
    const localStorageDisplayName = localStorage.getItem("displayName");

    if (user) {
      const displayName = user.displayName || "User";
      localStorage.setItem("displayName", displayName); // Cập nhật displayName vào localStorage nếu cần
      inforElement.innerHTML = `
        <div>
          <span class='hello'>Hello, </span>
          <span id="displayName">${displayName}</span>
          <button class="ggbutton" id='buttonSignOut'>Sign out</button>
        </div>
      `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else if (localStorageDisplayName) {
      inforElement.innerHTML = `
        <div>
          <span class='hello'>Hello, </span>
          <span id="displayName">${displayName}</span>
          <button class="signout-button" id='buttonSignOut'>Sign out</button>
        </div>
      `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else {
      inforElement.innerHTML = `
        <div class='signin'>
          <a href="/signin.html">Sign in</a>
        </div>
      `;
    }
  });
});
