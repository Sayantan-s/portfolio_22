import { CLIENT_ORIGIN, FREE_ACCESS_EMAIL, JWT_SECRET } from "@config";
import H from "@helpers/ResponseHelper";
import UtilityFuncs from "@helpers/UtilityFuncs";
import ErrorHandler from "@middlewares/error";
import { User } from "@prisma/client";
import prisma from "@services/prisma";
import stytchClient, { SESSION_AGE } from "@services/stytchAuth";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import {
  AuthenticateResponse,
  LoginOrCreateByEmailRequest,
} from "stytch/types/lib/magic_links";
import { AuthenticateResponse as SessionAuthenticate } from "stytch/types/lib/sessions";

function getParams(email: string): LoginOrCreateByEmailRequest {
  return {
    email,
    login_magic_link_url: CLIENT_ORIGIN + "/auth",
    signup_magic_link_url: CLIENT_ORIGIN + "/auth",
    create_user_as_pending: true,
  };
}

function extractUser(user: User) {
  return UtilityFuncs.pick(user, "newUser", "email", "details", "id");
}

export function extractAuthPayload(
  metaData: AuthenticateResponse | SessionAuthenticate
) {
  return UtilityFuncs.pick(metaData, "session", "session_token", "session_jwt");
}

export const loginOrCreate: RequestHandler = async (req, res) => {
  const { email } = req.body;
  await stytchClient.magicLinks.email.loginOrCreate(getParams(email));
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: req.body,
  });
  req.session.user = user;
  req.session.save();
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
  req.session.auth = extractAuthPayload(metaData);
  req.session.save();
  H.success(res, {
    success: true,
    statusCode: 200,
    data: {
      ...extractAuthPayload(metaData),
      user: extractUser(req.session.user!),
      access_token: null,
    },
  });
};

export const logOut: RequestHandler = async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) throw new ErrorHandler(401, "Not Authorized");
  await stytchClient.sessions.revoke({ session_id });
  req.session.destroy((err) => {
    if (err) throw new ErrorHandler(400, `Session could'nt be removed.`);
  });
  H.success(res, {
    success: true,
    statusCode: 200,
  });
};

export const getUser: RequestHandler = async (req, res) => {
  const { name } = req.params;
  const data = await prisma.user.findMany({
    where: {
      details: {},
    },
  });
  H.success(res, {
    success: true,
    statusCode: 200,
    data,
  });
};

export const updateUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...req.body,
      newUser: false,
    },
  });
  H.success(res, {
    success: true,
    statusCode: 200,
    data,
  });
};

export const easyAccess: RequestHandler = async (req, res) => {
  const { email } = req.body;
  if (email !== FREE_ACCESS_EMAIL)
    throw new ErrorHandler(403, "Denied for easy access");
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: req.body,
  });
  const access_token = jwt.sign({ email, id: user.id }, JWT_SECRET!, {
    expiresIn: 1000 * 60 * SESSION_AGE,
  });
  H.success(res, {
    success: true,
    statusCode: 200,
    data: {
      user,
      access_token,
      session: null,
      session_jwt: null,
      session_token: null,
    },
  });
};
