import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultController.getAllFaculties);
router.get(
  '/my-course',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultController.myCourse,
);
router.get('/:id', FacultController.getSingleFaculty);
router.get(
  '/my-course-students',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultController.getMyCourseStudents,
);

router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultController.createFaculty,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultController.updateFaculty,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultController.deleteFaculty,
);

router.post(
  '/:id/assign-courses',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.assignOrRemoveCoursesZodSchema),
  FacultController.assignCourses,
);

router.delete(
  '/:id/remove-courses',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.assignOrRemoveCoursesZodSchema),
  FacultController.removeCourses,
);

export const FacultyRouter = router;
