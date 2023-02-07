import express from "express";

const sseRouter = express.Router();

sseRouter.get("/stream", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  const data = JSON.stringify({ ticker: "HELLO" });
  setTimeout(() => {
    res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
  }, 3000);
});

export default sseRouter;
