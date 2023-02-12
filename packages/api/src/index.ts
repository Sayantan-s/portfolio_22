import { CLIENT_ORIGIN, ORIGIN, PORT, SESSION_SECRET } from "@config";
import ErrorHandler from "@middlewares/error";
import router from "@routes";
import sseRouter from "@routes/sse.route";
import { IO } from "@services/io";
import redis from "@services/redis";
import chalk from "chalk";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import { AuthenticateResponse } from "stytch/types/lib/magic_links";
declare module "express-session" {
  interface SessionData {
    authMetaData: AuthenticateResponse;
  }
}

const app = express();
const server = http.createServer(app);
const RedisStore = connectRedis(session);

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
// app.use(compression());
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: false,
    },
    store: new RedisStore({ client: redis }),
  })
);

app.use("/api", router);
app.use("/stream", sseRouter);
app.use(ErrorHandler.handle);

const io = new IO(server);

io.init(IO.execute);

server.listen(PORT, () => {
  console.log(chalk.bgGray.bold.redBright(`SERVER RUNNING ON ${ORIGIN}`));
});

process.on("SIGINT", () => {
  redis.flushall();
  redis.disconnect();
  server.close();
});
