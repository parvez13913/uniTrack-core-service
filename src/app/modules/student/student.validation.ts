import { z } from 'zod';

const createStudentZodSchema = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student Id is Required',
    }),
    firstName: z.string({
      required_error: 'First Name is Required',
    }),
    middleName: z.string({
      required_error: 'Middle Name is Required',
    }),
    lastName: z.string({
      required_error: 'Last Name is Required',
    }),
    profileImage: z.string({
      required_error: 'Profile Image is Required',
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    gender: z.string({
      required_error: 'Gender is Required',
    }),
    bloodGroup: z.string({
      required_error: 'Blood Group is Required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester Id is Required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department Id is Required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty Id is Required',
    }),
  }),
});

const updateStudentZodSchema = z.object({
  body: z.object({
    studentId: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicSemesterId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const StudentValidation = {
  createStudentZodSchema,
  updateStudentZodSchema,
};
