import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await AcademicDepartmentService.createAcademicDepartment(data);

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Created Successfully',
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
};
