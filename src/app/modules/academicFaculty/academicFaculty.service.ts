/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { IAcademicFacultyFilters } from './academicFaculty.interface';

const createAcademicFaculty = async (
  data: AcademicFaculty,
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({ data });

  return result;
};

const getAllAcademicFaculty = async (
  filters: IAcademicFacultyFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicFacultyFilterableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: [options.sortOrder] }
        : { createdAt: 'desc' },
  });

  const total = await prisma.academicFaculty.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
};
