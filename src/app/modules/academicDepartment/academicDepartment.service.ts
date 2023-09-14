import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicDepartment = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({ data });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
};
