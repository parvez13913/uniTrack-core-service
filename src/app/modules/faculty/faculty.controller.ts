/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseFaculty, Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await FacultyService.createFaculty(facultyData);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculties(filters, options);

  sendResponse<Faculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Fetched Successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FacultyService.updateFaculty(id, payload);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted Successfully',
    data: result,
  });
});

const assignCourses = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body.courses;
  const result = await FacultyService.assignCourses(id, data);

  sendResponse<CourseFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculties Assigned Successfully!!',
    data: result,
  });
};

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['academicSemesterId', 'courseId']);
  const result = await FacultyService.myCourses(user, filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty courses deta fetched successfully',
    data: result,
  });
});

const removeCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body.courses;

  const result = await FacultyService.removeCourses(id, payload);

  sendResponse<CourseFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculties Deleted Successfully!!',
    data: result,
  });
});

const getMyCourseStudents = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filters = pick(req.query, [
    'academicSemesterId',
    'courseId',
    'offeredCourseSectionId',
  ]);
  const options = pick(req.query, ['limit', 'page']);
  const result = await FacultyService.getMyCourseStudents(
    filters,
    options,
    user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty course students fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const FacultController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  assignCourses,
  removeCourses,
  myCourses,
  getMyCourseStudents,
};
