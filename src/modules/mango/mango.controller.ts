import { Request, Response } from 'express';
import { MangoService } from './mango.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createMango = catchAsync(async (req: Request, res: Response) => {
  const data = await MangoService.createMangoIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Mango created successfully',
    data,
  });
});

const getMangos = catchAsync(async (req: Request, res: Response) => {
  const { results, meta } = await MangoService.getMangosFromDB(res);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mango getting successfully',
    data: results,
    meta,
  });
});

const getMangoById = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;
  const data = await MangoService.getMangoByIdFromDB(mangoId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mango getting Successfully',
    data,
  });
});

const updateMango = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;
  const data = await MangoService.updateMangoIntoDB(mangoId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mango updated Successfully',
    data,
  });
});

const deleteMangoById = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;
  const data = await MangoService.deleteMangoIntoDB(mangoId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mango deleted Successfully',
    data,
  });
});

export const mangoController = {
  createMango,
  getMangos,
  getMangoById,
  updateMango,
  deleteMangoById,
};
