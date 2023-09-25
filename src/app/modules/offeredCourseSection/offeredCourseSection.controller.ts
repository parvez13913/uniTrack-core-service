import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionFilterableFields } from './offeredCourseSection.constants';
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

const getAllOfferedCourseSections = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseSectionFilterableFields);
    const options = pick(req.query, paginationFields);
    const result =
      await OfferedCourseSectionService.getAllOfferedCourseSections(
        filters,
        options,
      );

    sendResponse<OfferedCourseSection[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course section fetched Successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const OfferedCourseSectionController = {
  createOfferedCourseSection,
  getAllOfferedCourseSections,
};
