import H from "@helpers/ResponseHelper";
import { Post } from "@prisma/client";
import prisma from "@services/prisma";
import sse from "@services/sse";
import { Request, RequestHandler, Response } from "express";

interface IGetAllJweetsResponse {
  data: Post[];
}

export const getPosts = async (
  _: Request,
  res: Response<IGetAllJweetsResponse>
) => {
  const jweets = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
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
  console.log(req.body);
  const data = req.body;
  const post = await prisma.post.create({ data });
  sse.send(JSON.stringify(post), "post");
  H.success(res, {
    success: true,
    statusCode: 201,
  });
};
