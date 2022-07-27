import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();

const server = createServer(app);
const io = new Server(server);

mongoose.connect("mongodb://localhost:27017/rocketsocket")

io.on("connection", (socket) => {
  console.log("Socket", socket.id);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get("/", (req, res) => {
  return res.json({
    message: "Hello Websocket",
  })
})

export { server, io };
