import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCourse = async (data: Course): Promise<Course> => {
  const result = await prisma.course.create({
    data,
  });

  return result;
};

export const CourseService = {
  createCourse,
};
