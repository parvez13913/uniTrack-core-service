/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentFilterableFields } from './student.constants';
import { IStudentFilters } from './student.interface';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });

  return result;
};

const getAllStudents = async (
  filters: IStudentFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Student[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentFilterableFields.map(field => ({
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: [options.sortOrder] }
        : { createdAt: 'desc' },
  });

  const total = await prisma.student.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({ where: { id } });

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<Student>,
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const StudentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
