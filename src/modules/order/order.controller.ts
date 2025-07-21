import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mango ordered successfully",
    data: order,
  })
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderService.getOrdersFromDB();

    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mango order getting successfully",
    data: order,
  })
});

export const orderController = {
  createOrder,
  getOrders,
};
