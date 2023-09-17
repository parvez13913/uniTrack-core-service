import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: 'Faculty Id is Required',
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
    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email(),
    contactNo: z.string({
      required_error: 'Contact No is Required',
    }),
    gender: z.string({
      required_error: 'Gender is Required',
    }),
    bloodGroup: z.string({
      required_error: 'Blood Group is Required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department Id is Required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty Id is Required',
    }),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    facultyId: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const FacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
