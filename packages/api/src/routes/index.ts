import * as auth from "@controllers/auth";
import { getJweets } from "@controllers/jweets";
import express from "express";

const router = express.Router();

router.route("/jweets").get(getJweets);
router.route("/auth/login").post(auth.loginOrCreate);
router.get("/auth/verify", auth.tokenVerify);

export default router;
