/* eslint-disable @typescript-eslint/no-explicit-any */
import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constants';
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

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, paginationFields);
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrations(
        filters,
        options,
      );

    sendResponse<SemesterRegistration[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Fetched Successfully!!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistration(id);

    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Fetched Successfully!!',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await SemesterRegistrationService.updateSemesterRegistration(
      id,
      payload,
    );

    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Updated Successfully!!',
      data: result,
    });
  },
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.deleteSemesterRegistration(id);

    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Deleted Successfully!!',
      data: result,
    });
  },
);

const startMySemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result =
      await SemesterRegistrationService.startMySemesterRegistration(
        user.userId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Studen Semester Registration Started Successfully!!',
      data: result,
    });
  },
);

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = (req as any).user;
  const result = await SemesterRegistrationService.enrollIntoCourse(
    user?.userId,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Studen Semester Registration Course Enrolled Successfully!!',
    data: result,
  });
});

const withdrewFromCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = (req as any).user;
  const result = await SemesterRegistrationService.withdrewFromCourse(
    user?.userId,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student withdrew from Course Successfully!!',
    data: result,
  });
});

const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.confirmMyRegistration(
      user?.userId,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Confirn Your registration',
      data: result,
    });
  },
);

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.getMyRegistration(
    user?.userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data is fatched',
    data: result,
  });
});

const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.startNewSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester started successfully!',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
  startMySemesterRegistration,
  enrollIntoCourse,
  withdrewFromCourse,
  confirmMyRegistration,
  getMyRegistration,
  startNewSemester,
};
