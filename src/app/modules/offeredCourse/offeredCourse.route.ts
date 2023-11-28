import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.post(
  '/create-offered-course',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseValidation.createOfferedCourseZodSchema),
  OfferedCourseController.createOfferedCourses,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseValidation.updateOfferedCourseZodSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.deleteOfferedCourse,
);

export const OfferedCourseRouter = router;
