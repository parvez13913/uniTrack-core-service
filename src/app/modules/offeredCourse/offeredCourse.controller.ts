import { OfferedCourse } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const OfferedCourseController = {
  createOfferedCourses,
};
