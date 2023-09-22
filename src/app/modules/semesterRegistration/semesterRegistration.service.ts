/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constants';
import { ISemesterRegistrationsFilters } from './semesterRegistration.interface';

const createSemesterRegistration = async (
  data: SemesterRegistration,
): Promise<SemesterRegistration> => {
  const isAnySemesterRegistrationUpcommingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });
  if (isAnySemesterRegistrationUpcommingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Thers is allrady an ${isAnySemesterRegistrationUpcommingOrOngoing.status} registration.`,
    );
  }

  const result = await prisma.semesterRegistration.create({
    data,
  });

  return result;
};

const getAllSemesterRegistrations = async (
  filters: ISemesterRegistrationsFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: semesterRegistrationFilterableFields.map(fields => ({
        [fields]: {
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

  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.semesterRegistration.count({
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

const getSingleRegistration = async (
  id: string,
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleRegistration,
};
