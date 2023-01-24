import stytchClient from "@services/stytchAuth";
import { RequestHandler } from "express";
import { StytchError } from "stytch";

export const withAuth: RequestHandler = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    try {
      await stytchClient.sessions.authenticate({
        session_token: token,
      });
      next();
    } catch (error) {
      if (error instanceof StytchError) {
        res.status(error.status_code).send({ error });
      }
    }
    return;
  }
  res.status(404).send({ message: "Not Authorized!" });
};
