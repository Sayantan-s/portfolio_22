import H from "@helpers/ResponseHelper";
import { NextFunction, Request, Response } from "express";

import { RequestHandler } from "express";

export default class ErrorHandler extends Error {
  statusCode?: number;
  constructor(status: number, message?: string) {
    super();
    this.statusCode = status;
    this.message = message || "Something wen't wrong";
  }
  static tryCatch(controller: RequestHandler) {
    const catcher: RequestHandler = async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
    return catcher;
  }
  static handle(
    err: ErrorHandler,
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    H.error(res, {
      statusCode: err.statusCode || 404,
      success: false,
      data: err.message,
    });
  }
}
