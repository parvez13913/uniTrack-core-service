/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { offeredCourseSectionFilterableFields } from './offeredCourseSection.constants';
import { IOfferedCourseSectionFilters } from './offeredCourseSection.interface';

const createOfferedCourseSection = async (
  data: OfferedCourseSection,
): Promise<OfferedCourseSection> => {
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offerde course does not exist');
  }

  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;

  const result = await prisma.offeredCourseSection.create({
    data,
  });

  return result;
};

const getAllOfferedCourseSections = async (
  filters: IOfferedCourseSectionFilters,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andCoditions = [];

  if (searchTerm) {
    andCoditions.push({
      OR: offeredCourseSectionFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCoditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.OfferedCourseSectionWhereInput =
    andCoditions.length > 0 ? { AND: andCoditions } : {};

  const result = await prisma.offeredCourseSection.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });

  const total = await prisma.offeredCourseSection.count({
    where: whereConditions,
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

const getSingleOfferedCourseSection = async (
  id: string,
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOfferedCourseSection = async (
  id: string,
  payload: Partial<OfferedCourseSection>,
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const OfferedCourseSectionService = {
  createOfferedCourseSection,
  getAllOfferedCourseSections,
  updateOfferedCourseSection,
  getSingleOfferedCourseSection,
};
