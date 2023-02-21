import { API_KEY, JWT_SECRET } from "@config";
import { extractAuthPayload } from "@controllers/auth";
import stytchClient, { SESSION_AGE } from "@services/stytchAuth";
import { loginSignUp } from "@upshot/shared";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error";

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
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);
    if (!authHeaders) throw new ErrorHandler(401, "Not Authorized");
    const token = authHeaders.split(" ")[1];
    const metaData = await stytchClient.sessions.authenticate({
      session_token: token,
      session_duration_minutes: SESSION_AGE,
    });
    req.session.auth = extractAuthPayload(metaData);
    req.session.save();
  }
  next();
};

export const validateCredentials: RequestHandler = async (req, _, next) => {
  await loginSignUp.validate(req.body);
  next();
};
