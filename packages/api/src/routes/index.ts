import { getJweets } from "@controllers/jweets";
import express from "express";

const router = express.Router();

router.route("/jweets").get(getJweets);

export default router;
