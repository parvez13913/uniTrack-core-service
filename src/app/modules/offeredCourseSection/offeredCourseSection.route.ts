import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post(
  '/create-offered-course-section',
  OfferedCourseSectionController.createOfferedCourseSection,
);

router.get('/', OfferedCourseSectionController.getAllOfferedCourseSections);

export const OfferedCourseSectionRouter = router;
