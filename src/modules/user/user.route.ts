import { Router } from "express";
import {
  getUsers,
  loginUser,
  refreshToken,
  registerUser,
} from "./user.controller";
import { userZodSchema } from "./user.validate";
import { validateRequest } from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { UserRole } from "./user.constrain";

const userRoute = Router();

userRoute.post(
  "/",

  validateRequest(userZodSchema.userCreateZodSchema),
  registerUser
);
userRoute.post(
  "/login",
  validateRequest(userZodSchema.userLoginZodSchema),
  loginUser
);

userRoute.post("/refresh-token", refreshToken);

userRoute.get("/", auth([UserRole.Admin, UserRole.Customer]), getUsers);

export default userRoute;
