import { Request, Response } from "express";
import User from "./user.model";
import { userService } from "./user.service";

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

export { registerUser, loginUser, getUsers };
