import express from 'express';
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
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule,
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseClassScheduleValidation.updateOfferedCourseClassSchedule,
  ),
  OfferedCourseClassScheduleController.updateOfferedCourseClassSchedule,
);

router.delete(
  '/:id',
  OfferedCourseClassScheduleController.deleteOfferedCourseClassSchedule,
);

export const OfferedCourseClassScheduleRouter = router;
