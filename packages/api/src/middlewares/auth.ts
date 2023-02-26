import { API_KEY, JWT_SECRET } from "@config";
import { extractAuthPayload } from "@controllers/auth";
import stytchClient, { SESSION_AGE } from "@services/stytchAuth";
import { loginSignUp } from "@upshot/shared";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error";
import { SocketMiddleware } from "./session";

export const withApiKeys: RequestHandler = ErrorHandler.tryCatch(
  async (req, _, next) => {
    const apikey =
      req.headers.accept === "text/event-stream"
        ? req.query.api_key
        : req.headers["x-api-key"];
    if (!apikey || apikey !== API_KEY)
      throw new ErrorHandler(403, "Access Denied. Invalid API_KEY.");
    next();
  }
);

export const withAuth: RequestHandler = async (req, _, next) => {
  const access_token = req.headers["x-access-token"];
  if (access_token) {
    jwt.verify(access_token as string, JWT_SECRET!);
  } else {
    if (!req.session.isAuthenticated) {
      const authHeaders = req.headers.authorization;
      if (!authHeaders) throw new ErrorHandler(401, "Not Authorized");
      const token = authHeaders.split(" ")[1];
      const metaData = await stytchClient.sessions.authenticate({
        session_token: token,
        session_duration_minutes: SESSION_AGE,
      });
      req.session.auth = extractAuthPayload(metaData);
      req.session.isAuthenticated = true;
      req.session.save();
    }
  }
  next();
};

export const withApiKeysSocket: SocketMiddleware = async (socket, next) => {
  const apikey = socket.handshake.auth["X-API-KEY"];
  if (!apikey || apikey !== API_KEY)
    throw new ErrorHandler(403, "Access Denied. Invalid API_KEY.");
  next();
};

export const withAuthSocket: SocketMiddleware = async (socket, next) => {
  next();
};

export const validateCredentials: RequestHandler = async (req, _, next) => {
  await loginSignUp.validate(req.body);
  next();
};
