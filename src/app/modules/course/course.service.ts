/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { courseFilterableFields } from './course.constants';
import { ICourseCreateData, ICourseFilters } from './course.interface';

const createCourse = async (data: ICourseCreateData): Promise<any> => {
  const { prerequisiteCourses, ...courseData } = data;
  const newCourses = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Course');
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      for (let index = 0; index < prerequisiteCourses.length; index++) {
        const createPrerequisite =
          await transactionClient.courseToPrereqisite.create({
            data: {
              courseId: result.id,
              prerequisiteId: prerequisiteCourses[index].courseId,
            },
          });

        console.log(createPrerequisite);
      }
    }
    return result;
  });

  if (newCourses) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourses.id,
      },
      include: {
        prerequisite: {
          include: {
            prerequistite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Course');
};

const getAllCourses = async (
  filters: ICourseFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCoditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    where: whereCoditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      prerequisite: {
        include: {
          prerequistite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  const total = await prisma.course.count({
    where: whereCoditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      prerequisite: {
        include: {
          prerequistite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

const updateCourse = async (
  id: string,
  payload: Partial<Course>,
): Promise<Course> => {
  const result = await prisma.course.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCourse = async (id: string): Promise<Course | null> => {
  await prisma.courseToPrereqisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          prerequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
