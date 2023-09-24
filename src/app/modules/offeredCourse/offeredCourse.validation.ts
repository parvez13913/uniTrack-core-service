import { z } from 'zod';

const createOfferedCourseZodSchema = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic department id is Required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester registration id is Required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course id is Required',
      }),
      {
        required_error: 'Course ids is Required',
      },
    ),
  }),
});

const updateOfferedCourseZodSchema = z.object({
  body: z.object({
    semesterRegistrationId: z.string().optional(),
    courseIds: z.string().optional(),
    academicDepartmentId: z.string().optional(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseZodSchema,
  updateOfferedCourseZodSchema,
};
