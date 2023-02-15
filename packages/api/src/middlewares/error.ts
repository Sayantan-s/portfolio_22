import H from "@helpers/ResponseHelper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StytchError } from "stytch";

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
    if (err instanceof PrismaClientKnownRequestError) {
      console.log(err);
      H.error(res, {
        statusCode: 404,
        success: false,
        data: {
          type: "Prisma Error",
          name: err.name,
          message: err.meta?.message,
        },
      });
      return;
    }
    if (err instanceof StytchError) {
      H.error(res, {
        statusCode: err.status_code || 404,
        success: false,
        data: {
          type: err.error_type,
          name: err.name,
          message: err.error_message,
        },
      });
      return;
    }
    H.error(res, {
      statusCode: err.statusCode || 404,
      success: false,
      data: err.message,
    });
  }
}
