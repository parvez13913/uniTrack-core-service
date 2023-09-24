import { OfferedCourse } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseFilterableFields } from './offeredCourse.constants';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await OfferedCourseService.createOfferedCourses(data);

  sendResponse<OfferedCourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Created Successfully!',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await OfferedCourseService.getAllOfferedCourses(
    filters,
    options,
  );

  sendResponse<OfferedCourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Fetched Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.getSingleOfferedCourse(id);

    sendResponse<OfferedCourse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Fetched Successfully!',
      data: result,
    });
  },
);

export const OfferedCourseController = {
  createOfferedCourses,
  getAllOfferedCourses,
  getSingleOfferedCourse,
};
