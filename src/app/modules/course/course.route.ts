import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.createCourseZodSchema),
  CourseController.createCourse,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.updateCourseZodSchema),
  CourseController.updateCourse,
);

router.get('/:id', CourseController.getSingleCourse);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.deleteCourse,
);

router.post(
  '/:id/assign-faculyis',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.assignOrRemoveCoursesZodSchema),
  CourseController.assignFaculties,
);

router.delete(
  '/:id/remove-faculyis',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.assignOrRemoveCoursesZodSchema),
  CourseController.removeFaculties,
);

router.get('/', CourseController.getAllCourses);

export const CourseRouter = router;
