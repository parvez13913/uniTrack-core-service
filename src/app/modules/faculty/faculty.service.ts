/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseFaculty, Faculty, Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { facultyFilterableFields } from './faculty.constants';
import {
  IFacultyCreatedEvent,
  IFacultyFilters,
  IFacultyMyCourseStudentsRequest,
} from './faculty.interface';

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
  const result = await prisma.faculty.findFirst({
    where: {
      facultyId: id,
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

const myCourses = async (
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
          faculties: {
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

const getMyCourseStudents = async (
  filters: IFacultyMyCourseStudentsRequest,
  options: IPaginationOptions,
  authUser: any,
): Promise<IGenericResponse<Student[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  console.log(authUser);

  if (!filters.academicSemesterId) {
    const currentAcademicSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });

    if (currentAcademicSemester) {
      filters.academicSemesterId = currentAcademicSemester.id;
    }
  }

  const offeredCourseSections =
    await prisma.studentSemesterRegistrationCourse.findMany({
      where: {
        offeredCourse: {
          course: {
            id: filters.courseId,
          },
        },
        offeredCourseSection: {
          offeredCourse: {
            semesterRegistration: {
              academicSemester: {
                id: filters.academicSemesterId,
              },
            },
          },
          id: filters.offeredCourseSectionId,
        },
      },
      include: {
        student: true,
      },
      take: limit,
      skip,
    });

  const students = offeredCourseSections.map(
    offeredCourseSection => offeredCourseSection.student,
  );

  const total = await prisma.studentSemesterRegistrationCourse.count({
    where: {
      offeredCourse: {
        course: {
          id: filters.courseId,
        },
      },
      offeredCourseSection: {
        offeredCourse: {
          semesterRegistration: {
            academicSemester: {
              id: filters.academicSemesterId,
            },
          },
        },
        id: filters.offeredCourseSectionId,
      },
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: students,
  };
};

const createFacultyFromEvent = async (
  event: IFacultyCreatedEvent,
): Promise<void> => {
  const faculty: Partial<Faculty> = {
    facultyId: event.id,
    firstName: event.name.firstName,
    lastName: event.name.lastName,
    middleName: event.name.middleName,
    profileImage: event.profileImage,
    email: event.email,
    contactNo: event.contactNo,
    gender: event.gender,
    bloodGroup: event.bloodGroup,
    designation: event.designation,
    academicDepartmentId: event.academicDepartment.syncId,
    academicFacultyId: event.academicFaculty.syncId,
  };

  await createFaculty(faculty as Faculty);
};

const updateFacultyFromEvent = async (event: any): Promise<void> => {
  const isExist = await prisma.faculty.findFirst({
    where: {
      facultyId: event.id,
    },
  });

  if (!isExist) {
    createFacultyFromEvent(event);
    return;
  } else {
    const facultyData: Partial<Faculty> = {
      facultyId: event.id,
      firstName: event.name.firstName,
      lastName: event.name.lastName,
      middleName: event.name.middleName,
      profileImage: event.profileImage,
      email: event.email,
      contactNo: event.contactNo,
      gender: event.gender,
      bloodGroup: event.bloodGroup,
      designation: event.designation,
      academicDepartmentId: event.academicDepartment.syncId,
      academicFacultyId: event.academicFaculty.syncId,
    };

    await prisma.faculty.updateMany({
      where: {
        facultyId: event.id,
      },
      data: facultyData,
    });
  }
};

export const FacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  assignCourses,
  removeCourses,
  myCourses,
  getMyCourseStudents,
  createFacultyFromEvent,
  updateFacultyFromEvent,
};
