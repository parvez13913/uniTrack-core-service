import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);

router.get(
  '/myCourses',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyCourses,
);

router.get(
  '/myCoursesSchedules',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyCourseSchedules,
);

router.get(
  '/myAcademicInfo',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myAcademicInfo,
);

router.get('/:id', StudentController.getSingleStudent);

router.post(
  '/createStudent',
  validateRequest(StudentValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.createStudent,
);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.updateStudent,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.deleteStudent,
);

export const StudentRouter = router;
