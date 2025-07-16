import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../user/user.constrain";

const authRouter = Router();

authRouter.post(
  "/change-password",
  auth(Object.values(UserRole)),
  authController.changePassword
);

authRouter.post("/reset-password", authController.resetPassword);

authRouter.post("/logout", authController.logout);

export default authRouter;
