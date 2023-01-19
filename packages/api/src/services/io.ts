import { CLIENT_ORIGIN } from "@config";
import http from "http";
import { Server, Socket } from "socket.io";
import prisma from "./prisma";

interface ICreateTweetRequestPayload {
  _id: string;
  payload: string;
}
export class IO {
  instance: Server;
  constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.instance = new Server(server, {
      cors: {
        origin: CLIENT_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
  }

  init(fn: (socket: Socket) => void) {
    this.instance.on("connection", fn);
  }

  static execute(socket: Socket) {
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
      socket.emit("created_jweet", res);
      socket.broadcast.emit("created_jweet", res);
    });
    socket.on("disconnect", () => {
      console.log(`${socket.id} Disconnected from client server...`);
    });
  }
}
