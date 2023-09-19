import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.constants';
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

const getAllCourses = async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await CourseService.getAllCourses(filters, options);

  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Fetched Successfully!!',
    meta: result.meta,
    data: result.data,
  });
};

const getSingleCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourse(id);

  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Fetched Successfully!!',
    data: result,
  });
};

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
};
