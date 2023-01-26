import stytchClient from "@services/stytchAuth";
import { RequestHandler } from "express";
import ErrorHandler from "./error";

export const withAuth: RequestHandler = async (req, _, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) throw new ErrorHandler(401, "Not Authorized");
  const token = authHeaders.split(" ")[1];
  await stytchClient.sessions.authenticate({
    session_token: token,
  });
  next();
};
