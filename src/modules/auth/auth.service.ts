import config from "../../config";
import AppError from "../../error/AppError";
import User from "../user/user.model";
import * as bcrypt from "bcrypt";

const changePassword = async (
  email: string,
  newPassword: string,
  oldPassword: string
) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) throw new AppError(404, "User Not Found");

  const storedPassword = await isUserExist.password;

  const isMatchedPassword = await bcrypt.compare(oldPassword, storedPassword);
  if (!isMatchedPassword) throw new AppError(403, "Password Not Matched");

  isUserExist.password = await bcrypt.hash(
    newPassword,
    config.password_salt_round!
  );
  await isUserExist.save();

  return isUserExist;
};

const resetPassword = async (
  email: string,
  phone: string,
  password: string
) => {
  console.log({ email, phone, password });
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) throw new AppError(404, "User Not Found");

  const checkPhoneNumber = isUserExist.phone === phone;
  if (!checkPhoneNumber) throw new AppError(403, "Wrong Phone Number");

  isUserExist.password = await bcrypt.hash(
    password,
    config.password_salt_round!
  );
  await isUserExist.save();

  return {
    email: isUserExist.email,
    phone: isUserExist.phone,
  };
};

export const authService = {
  changePassword,
  resetPassword,
};
