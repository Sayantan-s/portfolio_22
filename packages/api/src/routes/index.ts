import * as auth from "@controllers/auth";
import { getJweets } from "@controllers/jweets";
import H from "@helpers/ResponseHelper";
import { withAuth } from "@middlewares/auth";
import ErrorHandler from "@middlewares/error";
import express from "express";

const router = express.Router();

router
  .route("/jweets")
  .get(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(getJweets));
router.route("/auth/login").post(ErrorHandler.tryCatch(auth.loginOrCreate));
router.route("/auth/verify").get(ErrorHandler.tryCatch(auth.tokenVerify));
router.route("/auth/reauth").get(ErrorHandler.tryCatch(auth.reAuth));
router.route("/test").get(
  ErrorHandler.tryCatch((req, res) => {
    const pay = req.headers["name"];
    if (!pay) throw new Error("No such error!");
    H.success(res, {
      statusCode: 200,
      success: true,
      data: "Found!",
    });
  })
);

export default router;
