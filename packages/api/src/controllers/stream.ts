import { SSEEmitter } from "@helpers/SSEEmitter";
import { Post } from "@prisma/client";
import chalk from "chalk";
import { RequestHandler } from "express";

export const streamPosts: RequestHandler = (req, res) => {
  SSEEmitter.on("stream_posts", (data: Post) => {
    res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
  });
  req.on("close", () => {
    console.log(chalk.red("Stream post termination..."));
  });
};
