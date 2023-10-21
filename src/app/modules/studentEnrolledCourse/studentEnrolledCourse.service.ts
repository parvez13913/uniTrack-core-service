import {
  StudentEnrolledCourse,
  StudentEnrolledCourseStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createStudentEnrolledCourse = async (
  data: StudentEnrolledCourse,
): Promise<StudentEnrolledCourse> => {
  const isCourseOngoingOrCompleted =
    await prisma.studentEnrolledCourse.findFirst({
      where: {
        OR: [
          {
            status: StudentEnrolledCourseStatus.ONGOING,
          },
          {
            status: StudentEnrolledCourseStatus.COMPLETED,
          },
        ],
      },
    });

  if (isCourseOngoingOrCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isCourseOngoingOrCompleted.status?.toLowerCase()} registration`,
    );
  }

  const result = await prisma.studentEnrolledCourse.create({
    data,
    include: {
      academicSemester: true,
      student: true,
      course: true,
    },
  });

  return result;
};

export const StudentEnrolledCourseService = {
  createStudentEnrolledCourse,
};
