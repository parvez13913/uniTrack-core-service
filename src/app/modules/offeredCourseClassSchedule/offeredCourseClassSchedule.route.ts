import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';
import { OfferedCourseClassScheduleValidation } from './offeredCourseClassSchedule.validation';

const router = express.Router();

router.get(
  '/',
  OfferedCourseClassScheduleController.getAllOfferedCourseClassSchedule,
);
router.get(
  '/:id',
  OfferedCourseClassScheduleController.getSingleOfferedCourseClassSchedule,
);

router.post(
  '/create-offered-course-class-schedule',
  validateRequest(
    OfferedCourseClassScheduleValidation.createOfferedCourseClassSchedule,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule,
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseClassScheduleValidation.updateOfferedCourseClassSchedule,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseClassScheduleController.updateOfferedCourseClassSchedule,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseClassScheduleController.deleteOfferedCourseClassSchedule,
);

export const OfferedCourseClassScheduleRouter = router;
