import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post(
  '/create-offered-course-section',
  OfferedCourseSectionController.createOfferedCourseSection,
);

router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection,
);

router.patch('/:id', OfferedCourseSectionController.updateOfferedCourseSection);

router.delete(
  '/:id',
  OfferedCourseSectionController.deleteOfferedCourseSection,
);

router.get('/', OfferedCourseSectionController.getAllOfferedCourseSections);

export const OfferedCourseSectionRouter = router;
