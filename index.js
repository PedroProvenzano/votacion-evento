// Express
const express = require("express");
const app = express();
// Socket IO
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Middleware
app.use(express.static("public"));

// Envia al cliente el html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listener, lo que ejecuta la api (backend)
http.listen(process.env.PORT, () => {
  console.log(`Conectado en puerto ${process.env.PORT}`);
});
