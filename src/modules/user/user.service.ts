import { email } from "zod";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (payload: IUser) => {
  payload.password = await bcrypt.hash(payload.password, 10);

  const user = new User(payload);

  const data = await user.save();

  return data;
};

const loginUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) throw new AppError(404, "User Not Found");

  const checkPassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!checkPassword) throw new AppError(403, "Password not matched");

  const jwtPayload = {
    email: payload.email,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(jwtPayload, "Very Secret", { expiresIn: "7d" });

  return accessToken;
};

export const userService = {
  registerUser,
  loginUser,
};
