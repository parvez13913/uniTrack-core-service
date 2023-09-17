/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { IAcademicDepartmentFilters } from './academicDepartment.intrface';

const createAcademicDepartment = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({ data });
  return result;
};

const getAllDepartMents = async (
  filters: IAcademicDepartmentFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentFilterableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.academicDepartment.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicDepartment = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
  });

  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<AcademicDepartment>,
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartMents,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
