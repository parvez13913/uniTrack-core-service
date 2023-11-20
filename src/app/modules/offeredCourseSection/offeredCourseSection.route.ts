import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post(
  '/create-offered-course-section',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.createOfferedCourseSection,
);

router.get(
  '/:id',
  OfferedCourseSectionController.getSingleOfferedCourseSection,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.updateOfferedCourseSection,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.deleteOfferedCourseSection,
);

router.get('/', OfferedCourseSectionController.getAllOfferedCourseSections);

export const OfferedCourseSectionRouter = router;
