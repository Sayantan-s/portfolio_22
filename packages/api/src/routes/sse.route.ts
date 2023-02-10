import { streamPosts } from "@controllers/stream";
import ErrorHandler from "@middlewares/error";
import { sseMiddleware } from "@middlewares/sseMiddleware";
import express from "express";

const sseRouter = express.Router();

sseRouter.use(ErrorHandler.tryCatch(sseMiddleware));
sseRouter.get("/posts", ErrorHandler.tryCatch(streamPosts));

export default sseRouter;
