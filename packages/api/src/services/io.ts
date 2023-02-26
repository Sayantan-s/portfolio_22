import { CLIENT_ORIGIN } from "@config";
import { withApiKeysSocket, withAuthSocket } from "@middlewares/auth";
import http from "http";
import { Server, Socket } from "socket.io";

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
    this.instance.use(withApiKeysSocket);
    this.instance.use(withAuthSocket);
    this.instance.on("connection", fn);
  }

  static execute(io: Socket) {
    console.log(io.request.session);
    console.log(`${io.id} Connected to client server...`);
    io.on("disconnect", () => {
      console.log(`${io.id} Disconnected from client server...`);
    });
  }
}
