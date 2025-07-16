import { Request, Response } from "express";
import Mango from "./mango.model";
import { mongo } from "mongoose";
import { MangoService } from "./mango.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../error/AppError";

const createMango = catchAsync(async (req: Request, res: Response) => {
  const data = await MangoService.createMangoIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Mango created successfully",
    data,
  });
});

const getMangos = catchAsync(async (req: Request, res: Response) => {
  // throw new AppError(404, "error");
  const data = await Mango.find();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Mango getting successfully",
    data,
  });
});

const getMangoById = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;
  // const data = await Mango.findById(mangoId);
  const data = await MangoService.getMangoByIdFromDB(mangoId);
  res.send({
    success: true,
    message: "Mango getting Successfully",
    data,
  });
});

const updateMango = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;

  const data = await Mango.findByIdAndUpdate(mangoId, req.body, {
    new: true,
    runValidators: true,
  });
  res.send({
    success: true,
    message: "Mango updated Successfully",
    data,
  });
});

const deleteMangoById = catchAsync(async (req, res) => {
  const mangoId = req.params.mangoId;

  const data = await Mango.findByIdAndDelete(mangoId);
  res.send({
    success: true,
    message: "Mango deleted Successfully",
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
