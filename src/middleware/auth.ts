import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user.model";
import { email } from "zod";
import { IUser } from "../modules/user/user.interface";

export const auth =
  (role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) throw new AppError(401, "Authorization header not found");

    const isVerified = jwt.verify(token, "Very Secret") as JwtPayload;

    const isUserExist = await User.findOne({ email: isVerified.email });
    if (!isUserExist) throw new AppError(404, "User Not Found");

    if (!role.includes(isVerified.role))
      throw new AppError(401, "You can't access this recourse");

    req.user = isUserExist;

    next();
  };
