import AppError from '../../error/AppError';
import { IUser } from './user.interface';
import User from './user.model';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from '../../config';

const registerUser = async (payload: IUser) => {
  payload.password = await bcrypt.hash(payload.password, 10);

  const user = new User(payload);

  const data = await user.save();

  return data;
};

const loginUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) throw new AppError(404, 'User Not Found');

  const checkPassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!checkPassword) throw new AppError(403, 'Password not matched');

  const jwtPayload = {
    email: payload.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt.jwt_access_secret as string,
    { expiresIn: config.jwt.jwt_access_expires } as SignOptions
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt.jwt_refresh_secret as string,
    { expiresIn: config.jwt.jwt_refresh_expires } as SignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const verifyRefreshToken = jwt.verify(
    refreshToken,
    config.jwt.jwt_refresh_secret as string
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifyRefreshToken.email });
  if (!isUserExist) throw new AppError(404, 'User Not Found');

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt.jwt_access_secret as string,
    { expiresIn: config.jwt.jwt_access_expires } as SignOptions
  );

  return { accessToken };
};

export const userService = {
  registerUser,
  loginUser,
  refreshToken,
};
