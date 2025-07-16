import { Request, Response } from "express";
import User from "./user.model";
import { userService } from "./user.service";
import config from "../../config";

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await userService.registerUser(payload);

  res.send({
    success: true,
    message: "User Registered Successfully",
    data,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const data = await userService.loginUser(payload);

  res.cookie("accessToken", data.accessToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
    sameSite: "lax",
  });

  res.cookie("refreshToken", data.refreshToken, {
    secure: config.node_env !== "development",
    httpOnly: true,
  });

  res.send({
    success: true,
    message: "User Login Successfully",
    data,
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const data = await userService.refreshToken(refreshToken);

  res.send({
    success: true,
    message: "User Registered Successfully",
    data,
  });
};

const getUsers = async (req: Request, res: Response) => {
  const data = await User.find();

  res.json({
    success: true,
    message: "User retrieved Successfully",
    data,
  });
};

export { registerUser, loginUser, getUsers, refreshToken };
