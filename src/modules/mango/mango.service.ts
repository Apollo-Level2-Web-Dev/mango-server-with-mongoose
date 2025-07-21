import { IMango } from './mango.interface';
import Mango from './mango.model';

const createMangoIntoDB = async (payload: IMango) => {
  const data = await Mango.create(payload);
  return data;
};

const getMangoByIdFromDB = async (payload: string) => {
  const data = await Mango.findById(payload);
  return data;
};

export const MangoService = {
  createMangoIntoDB,
  getMangoByIdFromDB,
};
