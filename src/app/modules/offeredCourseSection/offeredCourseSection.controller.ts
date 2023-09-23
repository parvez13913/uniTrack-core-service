import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const createOfferedCourseSection = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await OfferedCourseSectionService.createOfferedCourseSection(data);

    sendResponse<OfferedCourseSection>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section created Successfully!',
      data: result,
    });
  },
);

export const OfferedCourseSectionController = {
  createOfferedCourseSection,
};
