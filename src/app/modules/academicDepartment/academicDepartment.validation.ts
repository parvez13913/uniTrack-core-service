import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty Id is Required',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
};
