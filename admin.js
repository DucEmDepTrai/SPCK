
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userInfoRef = ref(db, "UserInfo");

// Lấy giá trị của input
function getInputValue(id) {
    return document.getElementById(id).value;
}

// Xử lý khi form được submit
function submitForm(event) {
    event.preventDefault();
    let name = getInputValue('name');
    let email = getInputValue('email');
    saveUserInfo(name, email);

    document.getElementById("contactForm").reset(); 
    document.getElementById("name").focus(); 
}

// Lưu thông tin người dùng vào Firebase
function saveUserInfo(name, email) {
    const newUserInfoRef = push(userInfoRef);
    set(newUserInfoRef, {
        name: name,
        email: email,
        isDeleted: false
    });
}

// Hiển thị dữ liệu người dùng
function getUser(data) {
    if (data.exists()) {
        const userData = data.val();
        const userDataArray = Object.keys(userData);
        const containerContent = document.getElementById('containerContent');
        containerContent.innerHTML = "";
        userDataArray.forEach((key) => {
            const user = userData[key];
            const card = `
                <div>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <button onclick="editUser('${key}')">Edit</button>
                    <button onclick="deleteUser('${key}')">Delete</button>
                </div>
            `;
            containerContent.innerHTML += card;
        });
    } else {
        console.log("Data not found!");
    }
}

// Xóa dữ liệu người dùng
function deleteUser(key) {
    remove(ref(db, "UserInfo/" + key));
}

// Lắng nghe sự kiện giá trị thay đổi
onValue(userInfoRef, getUser);

// Xử lý khi form được submit
document.getElementById('contactForm').addEventListener("submit", submitForm);

// Chỉnh sửa thông tin người dùng
window.editUser = function(key) {
    const userDataRef = ref(db, "UserInfo/" + key);
    get(userDataRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const newName = prompt("Enter your new name: ", userData.name);
            const newEmail = prompt("Enter your new email: ", userData.email);
            update(userDataRef, {
                name: newName,
                email: newEmail,
            });
        } else {
            console.log("User not found!");
        }
    }).catch((error) => {
        console.error("Error getting user data:", error);
    });
}
