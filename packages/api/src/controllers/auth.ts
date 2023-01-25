import { CLIENT_ORIGIN } from "@config";
import prisma from "@services/prisma";
import stytchClient from "@services/stytchAuth";
import { RequestHandler } from "express";
import { LoginOrCreateByEmailRequest } from "stytch/types/lib/magic_links";

function getParams(email: string): LoginOrCreateByEmailRequest {
  return {
    email,
    login_magic_link_url: CLIENT_ORIGIN + "/auth",
    signup_magic_link_url: CLIENT_ORIGIN + "/auth",
    create_user_as_pending: true,
  };
}

export const loginOrCreate: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    await stytchClient.magicLinks.email.loginOrCreate(getParams(email));
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: req.body,
    });
    req.session.user = user;
    res.status(user.newUser ? 201 : 200).send();
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerify: RequestHandler = async (req, res) => {
  const token = req.headers["x-magic-token"];
  try {
    const { session_token, session_jwt, session } =
      await stytchClient.magicLinks.authenticate(token as string, {
        session_duration_minutes: 60 * 24 * 30,
      });
    res.status(200).json({
      data: {
        session_jwt,
        session_token,
        session,
        user: req.session.user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const reAuth: RequestHandler = async (req, res) => {
  const sessionToken = req.headers["x-session-token"];
  try {
    const { session_token, session_jwt, session } =
      await stytchClient.sessions.authenticate({
        session_token: sessionToken as string,
        session_duration_minutes: 60 * 24 * 30,
      });
    res.status(200).json({
      data: {
        session_jwt,
        session_token,
        session,
        user: req.session.user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
