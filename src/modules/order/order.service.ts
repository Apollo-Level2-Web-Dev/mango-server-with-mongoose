import AppError from '../../error/AppError';
import { IOrder } from './order.interface';
import Order from './order.model';
import Mango from '../mango/mango.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

const createOrderIntoDB = async (payload: IOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const mango = await Mango.findById(payload.mango).session(session);

    if (!mango) {
      throw new AppError(httpStatus.NOT_FOUND, 'Mango not found');
    }

    if (mango.stock < payload.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient Stock');
    }

    // Reduce the stock
    mango.stock -= payload.quantity;

    await mango.save({ session });

    const order = await Order.create([payload], { session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }
};

const getOrdersFromDB = async () => {
  const result = await Order.find().populate('user').populate('mango');
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
};
