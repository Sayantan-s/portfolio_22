import { CLIENT_ORIGIN, ORIGIN, PORT } from "@config";
import router from "@routes";
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
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

const io = new IO(server);

io.init(IO.execute);

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${ORIGIN}`);
});
