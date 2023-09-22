import { z } from 'zod';

const assignOrRemoveCoursesZodSchema = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'Faculties Are Required',
    }),
  }),
});

export const CourseValidation = {
  assignOrRemoveCoursesZodSchema,
};
