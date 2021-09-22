const express = require("express");
// const { Server } = require("socket.io");
// const http = require("http");
// const app = express();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// const server = http.createServer(app);
// const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {});
});

http.listen(process.env.PORT || 3001, () => {
  console.log("socket server running");
});

// app.listen(3000, () => {
//   console.log('SERVER RUNNING')
// })

