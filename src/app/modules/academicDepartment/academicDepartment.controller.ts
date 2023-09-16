import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
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

const getAllDepartMents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await AcademicDepartmentService.getAllDepartMents(
    filters,
    options,
  );

  sendResponse<AcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartMents,
};
