/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student, StudentEnrolledCourseStatus } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentFilterableFields } from './student.constants';
import { IStudentFilters } from './student.interface';
import { StudentUtils } from './student.utils';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });

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
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
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
  const result = await prisma.student.findUnique({
    where: { id },
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });

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
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });

  return result;
};

const deleteStudent = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });

  return result;
};

const myCourses = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
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

  const result = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      ...filter,
    },
    include: {
      course: true,
    },
  });

  return result;
};

const getMyCourseSchedules = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
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

  const studentEnrolledCourses = await myCourses(authUserId, filter);

  const studentEnrolledCourseIds = studentEnrolledCourses.map(
    item => item.courseId,
  );
  const result = await prisma.studentSemesterRegistrationCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      semesterRegistration: {
        academicSemester: {
          id: filter.academicSemesterId,
        },
      },

      offeredCourse: {
        course: {
          id: {
            in: studentEnrolledCourseIds,
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
      offeredCourseSection: {
        include: {
          offeredCourseClassSchedules: {
            include: {
              room: {
                include: {
                  building: true,
                },
              },
              faculties: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const myAcademicInfo = async (authUserId: string): Promise<any> => {
  const academicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        studentId: authUserId,
      },
    },
  });

  const enrolledCourses = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },

    include: {
      course: true,
      academicSemester: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const groupByAcademicSemesterData =
    StudentUtils.groupByAcademicSemester(enrolledCourses);

  return {
    academicInfo,
    courses: groupByAcademicSemesterData,
  };
};

const createStudentFromEvent = async (event: any): Promise<void> => {
  const studentData: Partial<Student> = {
    studentId: event.id,
    firstName: event.name.firstName,
    middleName: event.name.middleName,
    lastName: event.name.lastName,
    email: event.email,
    contactNo: event.contactNo,
    gender: event.gender,
    bloodGroup: event.bloodGroup,
    academicSemesterId: event.academicSemester.syncId,
    academicDepartmentId: event.academicDepartment.syncId,
    academicFacultyId: event.academicFaculty.syncId,
  };

  await createStudent(studentData as Student);
};

const updateStudentFromEvent = async (event: any): Promise<void> => {
  const isExist = await prisma.student.findFirst({
    where: {
      studentId: event.id,
    },
  });

  if (!isExist) {
    await createStudentFromEvent(event);
    return;
  } else {
    const studentData: Partial<Student> = {
      studentId: event.id,
      firstName: event.name.firstName,
      middleName: event.name.middleName,
      lastName: event.name.lastName,
      email: event.email,
      contactNo: event.contactNo,
      gender: event.gender,
      bloodGroup: event.bloodGroup,
      academicSemesterId: event.academicSemester.syncId,
      academicDepartmentId: event.academicDepartment.syncId,
      academicFacultyId: event.academicFaculty.syncId,
    };

    await prisma.student.updateMany({
      where: {
        studentId: event.id,
      },
      data: studentData as Student,
    });
  }
};

export const StudentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  myCourses,
  getMyCourseSchedules,
  myAcademicInfo,
  createStudentFromEvent,
  updateStudentFromEvent,
};
