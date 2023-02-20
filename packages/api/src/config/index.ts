import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const {
  ORIGIN,
  PORT,
  NODE_ENV,
  CLIENT_ORIGIN,
  STYTCH_PROJECT_ID,
  STYTCH_SECRET,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  API_KEY,
  FREE_ACCESS_EMAIL,
  JWT_SECRET,
} = process.env;

export {
  ORIGIN,
  PORT,
  NODE_ENV,
  CLIENT_ORIGIN,
  STYTCH_PROJECT_ID,
  STYTCH_SECRET,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  API_KEY,
  FREE_ACCESS_EMAIL,
  JWT_SECRET,
};
