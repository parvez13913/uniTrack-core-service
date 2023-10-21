import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const StudentEnrolledCourseController = {
  createStudentEnrolledCourse,
};
