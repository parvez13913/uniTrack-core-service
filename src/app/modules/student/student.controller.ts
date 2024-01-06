/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { ...studentData } = req.body;
  const result = await StudentService.createStudent(studentData);

  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await StudentService.getAllStudents(filters, options);

  sendResponse<Student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Fetchd Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Fetchd Successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateStudent(id, payload);

  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);

  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted Successfully',
    data: result,
  });
});

const getMyCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.getMyCourses(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student courses deta fetched successfully',
    data: result,
  });
});

const getMyCourseSchedules = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.getMyCourseSchedules(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Schedule deta fetched successfully',
    data: result,
  });
});

const myAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await StudentService.myAcademicInfo(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My academic info deta fetched successfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getMyCourses,
  getMyCourseSchedules,
  myAcademicInfo,
};
