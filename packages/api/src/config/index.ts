import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const { ORIGIN, PORT, NODE_ENV, CLIENT_ORIGIN } = process.env;

export { ORIGIN, PORT, NODE_ENV, CLIENT_ORIGIN };
