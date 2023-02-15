import { extractAuthPayload } from "@controllers/auth";
import stytchClient, { SESSION_AGE } from "@services/stytchAuth";
import { RequestHandler } from "express";
import ErrorHandler from "./error";

export const withAuth: RequestHandler = async (req, _, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) throw new ErrorHandler(401, "Not Authorized");
  const token = authHeaders.split(" ")[1];
  const metaData = await stytchClient.sessions.authenticate({
    session_token: token,
    session_duration_minutes: SESSION_AGE,
  });
  req.session.auth = extractAuthPayload(metaData);
  req.session.save();
  next();
};

export const validateCredentials: RequestHandler = async () => {};
