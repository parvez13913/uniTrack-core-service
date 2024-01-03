import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultController.getAllFaculties);
router.get(
  '/myCourse',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultController.myCourse,
);
router.get('/:id', FacultController.getSingleFaculty);
router.get(
  '/myCourseStudents',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultController.getMyCourseStudents,
);

router.post(
  '/createFaculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultController.createFaculty,
);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultController.updateFaculty,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultController.deleteFaculty,
);

router.post(
  '/:id/assignCourses',
  validateRequest(FacultyValidation.assignOrRemoveCoursesZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultController.assignCourses,
);

router.delete(
  '/:id/removeCourses',
  validateRequest(FacultyValidation.assignOrRemoveCoursesZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultController.removeCourses,
);

export const FacultyRouter = router;
