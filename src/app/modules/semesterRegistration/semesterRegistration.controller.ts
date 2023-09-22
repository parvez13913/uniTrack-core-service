import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await SemesterRegistrationService.createSemesterRegistration(data);

    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration created Successfully!!',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
};
