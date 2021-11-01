const socket = io();
let id;

// ID gen
socket.on("connect", () => {
  id = socket.id;
});

// Functions

// Middleware
const isForMe = (newId, callback) => {
  if (newId !== id) return;
  callback();
};

// General Funct

// Login

// Send
const buttonLogin = document.querySelector("#button-login");
const Login = () => {
  const inputLogin = document.querySelector("#input-login");
  if (inputLogin.value === "") return;
  socket.emit("login", {
    user: inputLogin.value,
  });
};

// Recieve
const LoginHandler = (data) => {
  const adminSection = document.querySelector("#section-admin");
  const userSection = document.querySelector("#section-user");
  if (data.isAdmin) {
    adminSection.style.display = "flex";
    userSection.style.display = "none";
    return;
  }
  adminSection.style.display = "none";
  userSection.style.display = "flex";
  return;
};

// Events

// JS Events
buttonLogin.addEventListener("click", Login);

// IO Events
socket.on("loginResp", (data) => {
  isForMe(data.id, () => {
    LoginHandler(data);
  });
});
