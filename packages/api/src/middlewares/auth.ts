import stytchClient from "@services/stytchAuth";
import { RequestHandler } from "express";

export const withAuth: RequestHandler = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const [_, token] = authHeaders.split(" ");
    try {
      await stytchClient.sessions.authenticate({
        session_token: token,
      });
      next();
    } catch (error) {
      console.log(error);
    }
    return;
  }
  res.status(404).send({ message: "Not Authorized!" });
};
