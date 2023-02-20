import * as auth from "@controllers/auth";
import { createPost, getPosts } from "@controllers/posts";
import { validateCredentials, withAuth } from "@middlewares/auth";
import ErrorHandler from "@middlewares/error";
import express from "express";

const router = express.Router();

router
  .route("/posts")
  .post(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(createPost))
  .get(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(getPosts));
router
  .route("/auth/login")
  .post(
    ErrorHandler.tryCatch(validateCredentials),
    ErrorHandler.tryCatch(auth.loginOrCreate)
  );
router
  .route("/auth/easy")
  .post(
    ErrorHandler.tryCatch(validateCredentials),
    ErrorHandler.tryCatch(auth.easyAccess)
  );
router.route("/auth/verify").get(ErrorHandler.tryCatch(auth.tokenVerify));
router
  .route("/auth/logout")
  .delete(ErrorHandler.tryCatch(withAuth), ErrorHandler.tryCatch(auth.logOut));
router.route("/user/:userId").patch(ErrorHandler.tryCatch(auth.updateUser));

export default router;
