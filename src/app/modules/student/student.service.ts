import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });

  return result;
};

export const StudentService = {
  createStudent,
};
