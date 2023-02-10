import { RequestHandler } from "express";

export const sseMiddleware: RequestHandler = (req, res, next) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  next();
};
