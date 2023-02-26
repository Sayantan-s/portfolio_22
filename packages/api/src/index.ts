import { CLIENT_ORIGIN, ORIGIN, PORT } from "@config";
import { withApiKeys } from "@middlewares/auth";
import ErrorHandler from "@middlewares/error";
import { sessionMiddleWare, withSession } from "@middlewares/session";
import { User } from "@prisma/client";
import router from "@routes";
import sseRouter from "@routes/sse.route";
import { IO } from "@services/io";
import redis from "@services/redis";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Session, SessionData } from "express-session";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import { AuthenticateResponse } from "stytch/types/lib/magic_links";

declare module "express-session" {
  interface SessionData {
    auth: Pick<
      AuthenticateResponse,
      "session" | "session_jwt" | "session_token"
    >;
    user: User;
    isAuthenticated: boolean;
  }
}

declare module "node:http" {
  interface IncomingMessage {
    session: Session & SessionData;
  }
}

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(sessionMiddleWare);

app.use(withApiKeys);
app.use("/api", router);
app.use("/stream", sseRouter);
app.use(ErrorHandler.handle);

const io = new IO(server);

io.init(IO.execute);
io.instance.use(withSession(sessionMiddleWare));

server.listen(PORT, () => {
  console.log(chalk.bgGray.bold.redBright(`SERVER RUNNING ON ${ORIGIN}`));
});

process.on("SIGINT", () => {
  redis.flushall();
  redis.disconnect();
  server.close();
});
