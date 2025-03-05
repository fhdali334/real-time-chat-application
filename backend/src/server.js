require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", async (userName) => {
    const user = await User.findOne({ userName });
    if (user) {
      socket.emit("loadMessages", await Message.find().sort({ timeStamp: 1 }));
    }
  });

  socket.on("sendMessage", async (data) => {
    const { userName, messageBody } = data;

    const user = await User.findOne({ userName });
    if (!user) return;

    const newMessage = new Message({
      userId: user.userId,
      userName,
      messageBody,
    });

    await newMessage.save();
    io.emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

server.listen(5000, () => console.log("Server running on port 5000"));  
