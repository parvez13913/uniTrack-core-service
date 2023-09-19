/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData } from './course.interface';

const createCourse = async (data: ICourseCreateData): Promise<any> => {
  const { prerequisiteCourses, ...courseData } = data;
  const newCourses = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Course');
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      for (let index = 0; index < prerequisiteCourses.length; index++) {
        const createPrerequisite =
          await transactionClient.courseToPrereqisite.create({
            data: {
              courseId: result.id,
              prerequisiteId: prerequisiteCourses[index].courseId,
            },
          });

        console.log(createPrerequisite);
      }
    }
    return result;
  });

  if (newCourses) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourses.id,
      },
      include: {
        prerequisite: {
          include: {
            prerequistite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Course');
};

export const CourseService = {
  createCourse,
};
