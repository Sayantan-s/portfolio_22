import H from "@helpers/ResponseHelper";
import { SSEEmitter } from "@helpers/SSEEmitter";
import { Post } from "@prisma/client";
import prisma from "@services/prisma";
import { RequestHandler } from "express";

interface IGetAllJweetsResponse {
  data: Post[];
}

export const getPosts: RequestHandler<
  unknown,
  unknown,
  IGetAllJweetsResponse
> = async (_, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          details: {
            select: {
              first_name: true,
              last_name: true,
              profile_pic: true,
              headline: true,
            },
          },
        },
      },
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
