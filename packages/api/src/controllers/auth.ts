import { CLIENT_ORIGIN } from "@config";
import prisma from "@services/prisma";
import stytchClient from "@services/stytchAuth";
import { Request, Response } from "express";
import { LoginOrCreateByEmailRequest } from "stytch/types/lib/magic_links";

export const loginOrCreate = async (req: Request, res: Response) => {
  const { email } = req.body;
  const params: LoginOrCreateByEmailRequest = {
    email,
    login_magic_link_url: CLIENT_ORIGIN + "/auth",
    signup_magic_link_url: CLIENT_ORIGIN + "/auth",
  };
  await stytchClient.magicLinks.email.loginOrCreate(params);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    res.status(200).send();
    return;
  }
  await prisma.user.create({
    data: req.body,
  });
  res.status(201).send();
};

export const tokenVerify = async (req: Request, res: Response) => {
  const token = req.headers["x-magic-token"];
  try {
    const sessionToken = await stytchClient.magicLinks.authenticate(
      token as string,
      {
        session_duration_minutes: 5,
      }
    );
    console.log("SESSION TOKEN", sessionToken);
    res.send({ data: sessionToken });
  } catch (err) {
    console.log(err);
  }
};
