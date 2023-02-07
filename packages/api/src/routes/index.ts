import * as auth from "@controllers/auth";
import { createPost, getPosts } from "@controllers/posts";
import { withAuth } from "@middlewares/auth";
import ErrorHandler from "@middlewares/error";
import express from "express";

const router = express.Router();

router
  .route("/posts")
  .get(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(getPosts))
  .post(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(createPost));
router.route("/auth/login").post(ErrorHandler.tryCatch(auth.loginOrCreate));
router.route("/auth/verify").get(ErrorHandler.tryCatch(auth.tokenVerify));
router
  .route("/auth/logout")
  .delete(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(auth.logOut));
router.route("/auth/easyaccess").post(ErrorHandler.tryCatch(auth.easyAccess));

export default router;
