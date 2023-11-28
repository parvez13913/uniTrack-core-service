import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';

const router = express.Router();

router.get('/', OfferedCourseSectionController.getAllOfferedCourseSections);

router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection,
);

router.post(
  '/create-offered-course-section',
  validateRequest(
    OfferedCourseSectionValidation.createOfferedCourseSectionZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.createOfferedCourseSection,
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseSectionValidation.updateOfferedCourseSectionZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.updateOfferedCourseSection,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.deleteOfferedCourseSection,
);

export const OfferedCourseSectionRouter = router;
