import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await CourseService.createCourse(data);

  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Creatde Successfully!!',
    data: result,
  });
});

export const CourseController = {
  createCourse,
};
