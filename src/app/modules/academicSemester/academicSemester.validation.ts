import { z } from 'zod';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is Required',
    }),
    title: z.string({
      required_error: 'Title is Required',
    }),
    code: z.string({
      required_error: 'Code is Required',
    }),
    startMonth: z.string({
      required_error: 'Start month is Required',
    }),
    endMonth: z.string(),
  }),
});

const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    year: z.number().optional(),
    title: z.string().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
