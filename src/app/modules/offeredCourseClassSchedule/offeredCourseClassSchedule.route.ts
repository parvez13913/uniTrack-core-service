import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post(
  '/create-offered-course-class-schedule',
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule,
);

export const OfferedCourseClassScheduleRouter = router;
