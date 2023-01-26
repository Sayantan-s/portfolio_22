import H from "@helpers/ResponseHelper";
import { Jweet } from "@prisma/client";
import prisma from "@services/prisma";
import { Request, Response } from "express";

interface IGetAllJweetsResponse {
  data: Jweet[];
}

export const getJweets = async (
  _: Request,
  res: Response<IGetAllJweetsResponse>
) => {
  const jweets = await prisma.jweet.findMany();
  H.success(res, {
    success: true,
    statusCode: 200,
    data: jweets,
  });
};
