import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseZodSchema),
  OfferedCourseController.createOfferedCourses,
);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

router.get('/', OfferedCourseController.getAllOfferedCourses);

export const OfferedCourseRouter = router;
