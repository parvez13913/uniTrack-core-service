/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { facultyFilterableFields } from './faculty.constants';
import { IFacultyFilters } from './faculty.interface';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const getAllFaculties = async (
  filters: IFacultyFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Faculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: facultyFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.faculty.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<Faculty>,
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const deleteFaculty = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const assignCourses = async (
  id: string,
  payload: string[],
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const result = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return result;
};

const myCourse = async (
  authUser: { userId: string; role: string },
  filter: {
    academicSemesterId?: string | null | undefined;
    courseId?: string | null | undefined;
  },
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });

    filter.academicSemesterId = currentSemester?.id;
  }

  const offeredCourseSections = await prisma.offeredCourseSection.findMany({
    where: {
      offeredCourseClassSchedules: {
        some: {
          faculty: {
            facultyId: authUser.userId,
          },
        },
      },
      offeredCourse: {
        semesterRegistration: {
          academicSemester: {
            id: filter.academicSemesterId,
          },
        },
      },
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseClassSchedules: {
        include: {
          room: {
            include: {
              building: true,
            },
          },
        },
      },
    },
  });

  const couseAndSchedule = offeredCourseSections.reduce(
    (acc: any, obj: any) => {
      const course = obj.offeredCourse.course;
      const classSchedules = obj.offeredCourseClassSchedules;

      const existingCourse = acc.find(
        (item: any) => item.couse?.id === course?.id,
      );
      if (existingCourse) {
        existingCourse.sections.push({
          section: obj,
          classSchedules,
        });
      } else {
        acc.push({
          course,
          sections: [
            {
              section: obj,
              classSchedules,
            },
          ],
        });
      }
      return acc;
    },
    [],
  );
  return couseAndSchedule;
};

const removeCourses = async (
  id: string,
  payload: string[],
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });

  const result = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  assignCourses,
  removeCourses,
  myCourse,
};
