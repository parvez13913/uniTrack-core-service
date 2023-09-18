import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IFacultyFilters } from '../faculty/faculty.interface';
import { buildingFilterableFields } from './building.constants';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });

  return result;
};

const getAllBuilding = async (
  filters: IFacultyFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Building[]>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: buildingFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.building.count({
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

export const BuildingService = {
  createBuilding,
  getAllBuilding,
};
