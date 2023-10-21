/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Prisma,
  StudentEnrolledCourse,
  StudentEnrolledCourseStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  studentEnrolledCourseRelationalFields,
  studentEnrolledCourseRelationalFieldsMapper,
  studentEnrolledCourseSearchableFields,
} from './studentEnrolledCourse.constants';
import { IStudentEnrolledCourseFilterRequest } from './studentEnrolledCourse.interface';

const createStudentEnrolledCourse = async (
  data: StudentEnrolledCourse,
): Promise<StudentEnrolledCourse> => {
  const isCourseOngoingOrCompleted =
    await prisma.studentEnrolledCourse.findFirst({
      where: {
        OR: [
          {
            status: StudentEnrolledCourseStatus.ONGOING,
          },
          {
            status: StudentEnrolledCourseStatus.COMPLETED,
          },
        ],
      },
    });

  if (isCourseOngoingOrCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isCourseOngoingOrCompleted.status?.toLowerCase()} registration`,
    );
  }

  const result = await prisma.studentEnrolledCourse.create({
    data,
    include: {
      academicSemester: true,
      student: true,
      course: true,
    },
  });

  return result;
};

const getAllStudentEnrolledCourses = async (
  filters: IStudentEnrolledCourseFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<StudentEnrolledCourse[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  if (!filterData.academicSemesterId) {
    const currentAcademicSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });

    if (currentAcademicSemester) {
      filterData.academicSemesterId = currentAcademicSemester.id;
    }
  }

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentEnrolledCourseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (studentEnrolledCourseRelationalFields.includes(key)) {
          return {
            [studentEnrolledCourseRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.StudentEnrolledCourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.studentEnrolledCourse.findMany({
    include: {
      academicSemester: true,
      student: true,
      course: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.studentEnrolledCourse.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleStudentEnrolledCourse = async (
  id: string,
): Promise<StudentEnrolledCourse | null> => {
  const result = await prisma.studentEnrolledCourse.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      student: true,
      course: true,
    },
  });
  return result;
};

export const StudentEnrolledCourseService = {
  createStudentEnrolledCourse,
  getAllStudentEnrolledCourses,
  getSingleStudentEnrolledCourse,
};
