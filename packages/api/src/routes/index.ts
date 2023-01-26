import * as auth from "@controllers/auth";
import { getJweets } from "@controllers/jweets";
import { withAuth } from "@middlewares/auth";
import ErrorHandler from "@middlewares/error";
import express from "express";

const router = express.Router();

router
  .route("/jweets")
  .get(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(getJweets));
router.route("/auth/login").post(ErrorHandler.tryCatch(auth.loginOrCreate));
router.route("/auth/verify").get(ErrorHandler.tryCatch(auth.tokenVerify));
router
  .route("/auth/logout")
  .delete(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(auth.logOut));

export default router;
