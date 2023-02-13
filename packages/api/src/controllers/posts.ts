import H from "@helpers/ResponseHelper";
import { SSEEmitter } from "@helpers/SSEEmitter";
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
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  });
  H.success(res, {
    success: true,
    statusCode: 200,
    data: posts,
  });
};

export const createPost: RequestHandler<unknown, unknown, Post> = async (
  req,
  res
) => {
  const data = req.body;
  const post = await prisma.post.create({ data, include: { user: true } });
  SSEEmitter.emit("stream_posts", JSON.stringify(post));
  H.success(res, {
    success: true,
    statusCode: 201,
  });
};
