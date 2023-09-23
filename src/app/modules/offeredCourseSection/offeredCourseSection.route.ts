import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post(
  '/create-offered-course-section',
  OfferedCourseSectionController.createOfferedCourseSection,
);

export const OfferedCourseSectionRouter = router;
