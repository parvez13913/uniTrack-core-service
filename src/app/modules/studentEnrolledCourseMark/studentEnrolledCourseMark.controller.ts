/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.constants';
import { StudentEnrolledCourseDefaultMarkService } from './studentEnrolledCourseMark.service';

const updateStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const updateData = req.body;

  const result =
    await StudentEnrolledCourseDefaultMarkService.updateStudentMarks(
      updateData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mark Updated!',
    data: result,
  });
});

const updateFinalMarks = catchAsync(async (req: Request, res: Response) => {
  const updateData = req.body;

  const result =
    await StudentEnrolledCourseDefaultMarkService.updateFinalMarks(updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Final Mark Updated!',
    data: result,
  });
});

const getAllStudentEnrolledCourseMarks = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
    const options = pick(req.query, paginationFields);
    const result =
      await StudentEnrolledCourseDefaultMarkService.getAllStudentEnrolledCourseMarks(
        filters,
        options,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student course marks fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getMyCourseMarks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const user = (req as any).user;

  const result = await StudentEnrolledCourseDefaultMarkService.getMyCourseMarks(
    filters,
    options,
    user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student course marks fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const StudentEnrolledCourseMarkController = {
  updateStudentMarks,
  getAllStudentEnrolledCourseMarks,
  updateFinalMarks,
  getMyCourseMarks,
};
