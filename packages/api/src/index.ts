import { ORIGIN, PORT } from "@config";
import { IO } from "@services/io";
import prisma from "@services/prisma";
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

interface ICreateTweetRequestPayload {
  _id: string;
  payload: string;
}

io.init((socket) => {
  console.log(`${socket.id} Connected to client server...`);
  socket.on("create_jweet", async (data: ICreateTweetRequestPayload) => {
    const res = await prisma.jweet.create({
      data: {
        title: "For Job",
        body: data.payload,
        slug: "xyz",
        userId: "63c4ff90ce1d2b18238a5ddb",
      },
    });
    socket.emit("created_tweet", res);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected from client server...`);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${ORIGIN}`);
});
