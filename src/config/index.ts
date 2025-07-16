import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  password_salt_round: process.env.PASSWORD_SALT_ROUND,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
    jwt_rest_secret: process.env.JWT_REST_SECRET,
    jwt_reset_expires: process.env.JWT_RESET_EXPIRES,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES,
  },
};
