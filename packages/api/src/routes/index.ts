import * as auth from "@controllers/auth";
import { getJweets } from "@controllers/jweets";
import express from "express";

const router = express.Router();

router.route("/jweets").get(getJweets);
router.route("/auth/login").post(auth.loginOrCreate);
router.route("/auth/verify").get(auth.tokenVerify);
router.route("/test").get((req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) res.json({ message: "User in session" });
  else res.json({ message: "User not in session" });
});

export default router;
