import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const createOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await OfferedCourseClassScheduleService.createOfferedCourseClassSchedule(
        data,
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course Schedule Created Successfully!',
      data: result,
    });
  },
);

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
};
