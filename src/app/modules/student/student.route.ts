import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.createStudentZodSchema),
  StudentController.createStudent,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);

router.get(
  '/my-courses-schedules',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyCourseSchedules,
);

router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myCourses,
);

router.get('/:id', StudentController.getSingleStudent);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.deleteStudent,
);

router.get('/', StudentController.getAllStudents);

export const StudentRouter = router;
