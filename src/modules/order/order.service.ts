import AppError from "../../error/AppError";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import httpStatus from "http-status";

const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.checkStock(payload.mango.toString(), payload.quantity);

  if (!result) throw new AppError(httpStatus.BAD_REQUEST, "Insufficient Stock");

  const order = await Order.create(payload);
  return order;
};

const getOrdersFromDB = async () => {
  const result = await Order.find().populate("user").populate("mango");
  return result;
};


export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
};