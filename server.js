const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://c0d3-socket.herokuapp.com/",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {});
});

server.listen(process.env.PORT || 3001, () => {
  console.log("socket server running");
});

// app.listen(3000, () => {
//   console.log('SERVER RUNNING')
// })

