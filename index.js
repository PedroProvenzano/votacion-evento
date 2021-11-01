// Dotenv
require("dotenv/config");
// Express
const express = require("express");
const app = express();
// Socket IO
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Middleware
app.use(express.static("public-test"));

// Local Variables
class Poll {
  constructor(title, description) {
    this.id = Math.floor(Math.random() * 100000);
    this.title = title;
    this.description = description;
    this.winner = null;
  }

  get title() {
    return this.title;
  }

  get description() {
    return this.description;
  }

  get all() {
    return {
      title: this.title,
      description: this.description,
    };
  }
}

// Middlewares functions
const isAdmin = (user) => {
  if (user === "admin434") return true;
  return false;
};

// Socket IO
io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  socket.on("login", (data) => {
    socket.emit("loginResp", {
      id: socket.id,
      isAdmin: isAdmin(data.user),
    });
  });

  socket.on("admin-poll", (data) => {
    if (!isAdmin(data.user)) return;
  });
});

// Envia al cliente el html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listener, lo que ejecuta la api (backend)
http.listen(process.env.PORT, () => {
  console.log(`Conectado en puerto ${process.env.PORT}`);
});
