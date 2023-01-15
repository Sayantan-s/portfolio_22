import { CLIENT_ORIGIN } from "@config";
import http from "http";
import { Server, Socket } from "socket.io";

export class IO {
  instance: Server;
  constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.instance = new Server(server, {
      cors: {
        origin: CLIENT_ORIGIN,
        methods: ["GET", "POST"],
      },
    });
  }
  init(fn: (socket: Socket) => void) {
    this.instance.on("connection", fn);
  }
}
