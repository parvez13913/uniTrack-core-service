import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

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
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule,
);

router.patch(
  '/:id',
  OfferedCourseClassScheduleController.updateOfferedCourseClassSchedule,
);

export const OfferedCourseClassScheduleRouter = router;
