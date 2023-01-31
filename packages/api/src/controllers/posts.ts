import H from "@helpers/ResponseHelper";
import { Post } from "@prisma/client";
import prisma from "@services/prisma";
import { Request, RequestHandler, Response } from "express";

interface IGetAllJweetsResponse {
  data: Post[];
}

export const getPosts = async (
  _: Request,
  res: Response<IGetAllJweetsResponse>
) => {
  const jweets = await prisma.post.findMany();
  H.success(res, {
    success: true,
    statusCode: 200,
    data: jweets,
  });
};

export const createPost: RequestHandler<unknown, unknown, Post> = async (
  req,
  res
) => {
  const data = req.body;
  await prisma.post.create({ data });
  H.success(res, {
    success: true,
    statusCode: 201,
  });
};
