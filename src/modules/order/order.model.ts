import { model, Schema } from "mongoose";
import { IOrder, IOrderMethods, IOrderModel } from "./order.interface";
import Mango from "../mango/mango.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const orderAddressSchema = new Schema({
  zipcode: String,
  state: String,
  country: String,
  street: String,
});

const orderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  mango: { type: Schema.Types.ObjectId, ref: "Mango", required: true },
  quantity: { type: Number, min: 0, required: true },
  totalPrice: { type: Number, min: 0 },
  address: { type: orderAddressSchema, required: true },
  status: { type: String, required: true },
});

orderSchema.pre("save", async function () {
  const mango = await Mango.findById(this.mango);
  if (!mango) throw new AppError(httpStatus.NOT_FOUND, "Mango not found");

  this.totalPrice = mango.price * this.quantity;
});


orderSchema.static("checkStock", async function checkStock(id, quantity) {
  const product = await Mango.findById(id);
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");

  if (product.stock < quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient stock");
  }

  return true;
});

orderSchema.method("checkStock", async function checkStock() {
  const order = this as IOrder;

  const product = await Mango.findById(order.mango);
  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");

  if (product.stock < order.quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient stock");
  }

  return true;
});

const Order = model<IOrder, IOrderModel>("Order", orderSchema);
export default Order;
