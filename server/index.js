const express = require("express");
const app = express();
const PORT = 8000;

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
let users = [];

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
  autoConnect: false,
});

function addUser(data, socketID) {
  let user = {
    socketID: socketID,
    userID: data,
  };
  for (let i = users.length - 1; (i = 0); i--) {
    if (users[i].userID === data) users.slice(i, 1);
  }
  users.push(user);
}

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    addUser(data, socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    console.log(users);
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
