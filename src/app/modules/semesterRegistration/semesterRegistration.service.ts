import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createSemesterRegistration = async (
  data: SemesterRegistration,
): Promise<SemesterRegistration> => {
  const isAnySemesterRegistrationUpcommingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });
  if (isAnySemesterRegistrationUpcommingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Thers is allrady an ${isAnySemesterRegistrationUpcommingOrOngoing.status} registration.`,
    );
  }

  const result = await prisma.semesterRegistration.create({
    data,
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistration,
};
