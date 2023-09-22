import { z } from 'zod';

const createSemesterRegistrationZodSchema = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start Date is Required',
    }),
    endDate: z.string({
      required_error: 'End Date is Required',
    }),
    status: z.string({
      required_error: 'Status is Required',
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

export const SemesterRegistrationValidation = {
  createSemesterRegistrationZodSchema,
};
