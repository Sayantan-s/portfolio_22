import { ORIGIN, PORT } from "@config";
import { IO } from "@services/io";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

const io = new IO(server);

io.init((socket) => {
  console.log(`${socket.id} Connected to client server...`);
  socket.on("create_jweet", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected from client server...`);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${ORIGIN}`);
});
