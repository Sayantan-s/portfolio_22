import { API_KEY } from "@config";
import { extractAuthPayload } from "@controllers/auth";
import stytchClient, { SESSION_AGE } from "@services/stytchAuth";
import { loginSignUp } from "@upshot/shared";
import chalk from "chalk";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error";

export const withAuth: RequestHandler = async (req, _, next) => {
  const apikey = req.headers["x-api-key"];
  if (!apikey || apikey !== API_KEY)
    throw new ErrorHandler(403, "Access Denied. Invalid API_KEY.");
  const access_token = req.headers["x-access-token"];
  console.log(console.log(chalk.red(access_token)));
  if (access_token) {
    const payload = jwt.verify(access_token as string, "secret", (err) => {
      console.log(chalk.yellow(err?.message));
      throw new ErrorHandler(401, err?.message);
    });
  } else {
    const authHeaders = req.headers.authorization;
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
