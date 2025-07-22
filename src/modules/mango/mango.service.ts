import { Response } from 'express';
import { IMango } from './mango.interface';
import Mango from './mango.model';

const createMangoIntoDB = async (payload: IMango) => {
  const data = await Mango.create(payload);
  return data;
};

const getMangosFromDB = async (res: Response) => {
  // const data = await Mango.find();
  const { results, meta } = res.locals.data;
  return {
    results,
    meta,
  };
};

const updateMangoIntoDB = async (payload: string, update: IMango) => {
  const data = await Mango.findByIdAndUpdate(payload, update, {
    new: true,
    runValidators: true,
  });
  return data;
};

const deleteMangoIntoDB = async (payload: string) => {
  const data = await Mango.findByIdAndDelete(payload);
  return data;
};

const getMangoByIdFromDB = async (payload: string) => {
  const data = await Mango.findById(payload);
  return data;
};

export const MangoService = {
  createMangoIntoDB,
  getMangosFromDB,
  updateMangoIntoDB,
  deleteMangoIntoDB,
  getMangoByIdFromDB,
};
