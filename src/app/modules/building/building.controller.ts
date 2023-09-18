import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const { ...buildingData } = req.body;

  const result = await BuildingService.createBuilding(buildingData);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Created Successfully!!',
    data: result,
  });
});

export const BuildingController = {
  createBuilding,
};
