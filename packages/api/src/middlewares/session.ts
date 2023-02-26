import { SESSION_SECRET } from "@config";
import redis from "@services/redis";
import { SESSION_AGE } from "@services/stytchAuth";
import connectRedis from "connect-redis";
import session from "express-session";
import { Server } from "socket.io";

const RedisStore = connectRedis(session);
export type SocketMiddleware = Parameters<Server["use"]>[0];

export const sessionMiddleWare = session({
  secret: SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * SESSION_AGE,
    sameSite: "lax",
    secure: false,
  },
  store: new RedisStore({ client: redis }),
});

export const withSession =
  (middleware: Function): SocketMiddleware =>
  (socket, next) =>
    middleware(socket.request, {}, next);
