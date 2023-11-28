import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilterableFieldas } from './offeredCourseClassSchedule.constants';
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

const getAllOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(
      req.query,
      offeredCourseClassScheduleFilterableFieldas,
    );
    const options = pick(req.query, paginationFields);
    const result =
      await OfferedCourseClassScheduleService.getAllOfferedCourseClassSchedule(
        filters,
        options,
      );

    sendResponse<OfferedCourseClassSchedule[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course Schedule Fetched Successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await OfferedCourseClassScheduleService.getSingleOfferedCourseClassSchedule(
        id,
      );

    sendResponse<OfferedCourseClassSchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course Schedule Fetched Successfully!',
      data: result,
    });
  },
);

const updateOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result =
      await OfferedCourseClassScheduleService.updateOfferedCourseClassSchedule(
        id,
        payload,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourseClassSchedule updated successfully',
      data: result,
    });
  },
);

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
  getSingleOfferedCourseClassSchedule,
  updateOfferedCourseClassSchedule,
};
