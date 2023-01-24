import { RequestHandler } from "express";

export default class ErrorHandler {
  static TryCatch(controller: RequestHandler) {
    const catcher: RequestHandler = async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
    return catcher;
  }
}
