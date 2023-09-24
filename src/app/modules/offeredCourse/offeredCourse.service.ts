import { Prisma } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourse } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { offeredCourseFilterableFields } from './offeredCourse.constants';
import {
  ICreateOfferedCourse,
  IOfferedCourseFilters,
} from './offeredCourse.interface';

const createOfferedCourses = async (
  data: ICreateOfferedCourse,
): Promise<OfferedCourse[]> => {
  const { semesterRegistrationId, academicDepartmentId, courseIds } = data;
  const result: OfferedCourse[] = [];
  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });

      result.push(insertOfferedCourse);
    }
  });

  return result;
};

const getAllOfferedCourses = async (
  filters: IOfferedCourseFilters,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: offeredCourseFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.OfferedCourseWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.offeredCourse.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.offeredCourse.count({
    where: whereCondition,
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

const getSingleOfferedCourse = async (
  id: string,
): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const OfferedCourseService = {
  createOfferedCourses,
  getAllOfferedCourses,
  getSingleOfferedCourse,
};
