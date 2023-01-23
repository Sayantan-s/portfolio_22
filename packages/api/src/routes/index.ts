import * as auth from "@controllers/auth";
import { getJweets } from "@controllers/jweets";
import { withAuth } from "@middlewares/auth";
import express from "express";

const router = express.Router();

router.route("/jweets").get(withAuth, getJweets);
router.route("/auth/login").post(auth.loginOrCreate);
router.route("/auth/verify").get(auth.tokenVerify);

export default router;
