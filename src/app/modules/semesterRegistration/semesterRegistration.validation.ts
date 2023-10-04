import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const createSemesterRegistrationZodSchema = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start Date is Required',
    }),
    endDate: z.string({
      required_error: 'End Date is Required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester Id is Required',
    }),
    minCredit: z.number({
      required_error: 'Min Credit is Required',
    }),
    maxCredit: z.number({
      required_error: 'Max Credit is Required',
    }),
  }),
});

const updateSemesterRegistrationZodSchema = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {},
      )
      .optional(),
    academicSemesterId: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

const inrollOrWithdrawCourseZodSchema = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offered course id is Required',
    }),
    offeredCourseSectionId: z.string({
      required_error: 'Offered course section id is Required',
    }),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationZodSchema,
  updateSemesterRegistrationZodSchema,
  inrollOrWithdrawCourseZodSchema,
};
