import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true, min: 3, max: 255 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: true,
    immutable: true,
  },
  phone: {
    type: String,
    required: [true, "Your Phone Number is not valid"],
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ["Admin", "Customer"],
      message: "{VALUE} is not acceptable",
    },
    required: true,
  },
});

const User = model<IUser>("user", userSchema);
export default User;
