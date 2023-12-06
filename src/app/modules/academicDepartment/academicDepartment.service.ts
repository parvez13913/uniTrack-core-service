/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
  academicDepartmentFilterableFields,
} from './academicDepartment.constants';
import { IAcademicDepartmentFilters } from './academicDepartment.intrface';

const createAcademicDepartment = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_CREATED,
      JSON.stringify(result),
    );
  }
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
    include: {
      academicFaculty: true,
    },
  });

  const total = await prisma.academicDepartment.count({
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

const getSingleAcademicDepartment = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
    include: {
      academicFaculty: true,
    },
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
    include: {
      academicFaculty: true,
    },
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_UPDATED,
      JSON.stringify(result),
    );
  }

  return result;
};

const deleteAcademicDepartment = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_DELETED,
      JSON.stringify(result),
    );
  }

  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartMents,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
