import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseFilterableFields } from './studentEnrolledCourse.constants';
import { StudentEnrolledCourseService } from './studentEnrolledCourse.service';

const createStudentEnrolledCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await StudentEnrolledCourseService.createStudentEnrolledCourse(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'StudentEnrolledCourse created successfully',
      data: result,
    });
  },
);

const getAllStudentEnrolledCourse = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentEnrolledCourseFilterableFields);
    const options = pick(req.query, paginationFields);
    const result =
      await StudentEnrolledCourseService.getAllStudentEnrolledCourse(
        filters,
        options,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'StudentEnrolledCourses fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const StudentEnrolledCourseController = {
  createStudentEnrolledCourse,
  getAllStudentEnrolledCourse,
};
