import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterableField } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await AcademicSemesterService.createAcademicSemister(data);

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicSemesterFilterableField);
    const options = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllAcademicSemesters(
      filters,
      options,
    );

    sendResponse<AcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Fetched Successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicSemester(id);

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Fetched Successfully',
      data: result,
    });
  },
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      payload,
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Updated Successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemister,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
