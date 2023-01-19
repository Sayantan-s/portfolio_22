import { CLIENT_ORIGIN } from "@config";
import stytchClient from "@services/stytchAuth";
import { Request, Response } from "express";
import { LoginOrCreateByEmailRequest } from "stytch/types/lib/magic_links";

export const loginOrCreate = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email } = req.body;
  const params: LoginOrCreateByEmailRequest = {
    email,
    login_magic_link_url: CLIENT_ORIGIN,
    signup_magic_link_url: CLIENT_ORIGIN,
  };
  const response = await stytchClient.magicLinks.email.loginOrCreate(params);
  res.send({ data: response });
};
