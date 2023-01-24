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
  };
}

export const loginOrCreate: RequestHandler = async (req, res) => {
  const { email } = req.body;
  await stytchClient.magicLinks.email.loginOrCreate(getParams(email));
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (findUser) {
    req.session.user = findUser;
    res.status(200).send();
    return;
  }
  const createNewUser = await prisma.user.create({
    data: req.body,
  });
  req.session.user = createNewUser;
  res.status(201).send();
};

export const tokenVerify: RequestHandler = async (req, res) => {
  const token = req.headers["x-magic-token"];
  try {
    const { session_token, session_jwt } =
      await stytchClient.magicLinks.authenticate(token as string, {
        session_duration_minutes: 30,
      });
    res.status(200).json({
      data: {
        session_jwt,
        session_token,
        user: req.session.user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
