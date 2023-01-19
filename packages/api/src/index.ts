import { CLIENT_ORIGIN, ORIGIN, PORT } from "@config";
import { User } from "@prisma/client";
import router from "@routes";
import { IO } from "@services/io";
import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
]);

app.use("/api", router);

const io = new IO(server);

io.init(IO.execute);

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${ORIGIN}`);
});
