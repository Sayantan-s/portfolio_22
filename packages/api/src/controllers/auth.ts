import { CLIENT_ORIGIN } from "@config";
import H from "@helpers/ResponseHelper";
import ErrorHandler from "@middlewares/error";
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
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      newUser: false,
    },
    create: req.body,
  });
  await stytchClient.magicLinks.email.loginOrCreate(getParams(email));
  H.success(res, {
    success: true,
    statusCode: user.newUser ? 201 : 200,
  });
};

export const tokenVerify: RequestHandler = async (req, res) => {
  const token = req.headers["x-magic-token"];
  const metaData = await stytchClient.magicLinks.authenticate(token as string, {
    session_duration_minutes: 60 * 24 * 30,
  });
  req.session.authMetaData = metaData!;
  H.success(res, {
    success: true,
    statusCode: 200,
    data: metaData,
  });
};

export const logOut: RequestHandler = async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) throw new ErrorHandler(401, "Not Authorized");
  await stytchClient.sessions.revoke({ session_id });
  req.session.destroy((err) => {
    if (err) throw new Error(`Serverside session could'nt be removed.`);
  });
  H.success(res, {
    success: true,
    statusCode: 200,
  });
};

export const easyAccess: RequestHandler = async (req, res) => {
  const { user_id } = req.body;
  const session = await stytchClient.sessions.get({ user_id });
  H.success(res, {
    success: true,
    statusCode: session.status_code,
    data: session,
  });
};
