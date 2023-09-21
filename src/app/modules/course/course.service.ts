import { IPrerequisiteCourseRequest } from './course.interface';
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, CourseFaculty, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { courseFilterableFields } from './course.constants';
import { ICourseCreateData, ICourseFilters } from './course.interface';

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
      await asyncForEach(
        prerequisiteCourses,
        async (prerequisiteCourse: IPrerequisiteCourseRequest) => {
          const createPrerequisite =
            await transactionClient.courseToPrereqisite.create({
              data: {
                courseId: result.id,
                prerequisiteId: prerequisiteCourse.courseId,
              },
            });
          console.log(createPrerequisite);
        },
      );
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

const getAllCourses = async (
  filters: ICourseFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseFilterableFields.map(field => ({
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

  const whereCoditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    where: whereCoditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
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

  const total = await prisma.course.count({
    where: whereCoditions,
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

const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
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

  return result;
};

const updateCourse = async (
  id: string,
  payload: ICourseCreateData,
): Promise<Course | null> => {
  const { prerequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      const deletedPrereqisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted,
      );

      const newPrerequisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted,
      );

      await asyncForEach(
        deletedPrereqisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrereqisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  prerequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        },
      );

      await asyncForEach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrereqisite.create({
            data: {
              courseId: id,
              prerequisiteId: insertPrerequisite.courseId,
            },
          });
        },
      );
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
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
};

const deleteCourse = async (id: string): Promise<Course | null> => {
  await prisma.courseToPrereqisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          prerequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });

  return result;
};

const assignFaculties = async (
  id: string,
  payload: string[],
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });

  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return result;
};

const removeFaculties = async (
  id: string,
  payload: string[],
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId: id,
      facultyId: {
        in: payload,
      },
    },
  });

  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFaculties,
};
