import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get(
  '/getMyRegistration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMyRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

router.get(
  '/getMySemesterCourses',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMySemesterRegistrationCourses,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.post(
  '/startRegistration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMySemesterRegistration,
);

router.post(
  '/',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.createSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.post(
  '/enrollIntoCourse',
  validateRequest(
    SemesterRegistrationValidation.inrollOrWithdrawCourseZodSchema,
  ),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.enrollIntoCourse,
);

router.post(
  '/withdrawFromCourse',
  validateRequest(
    SemesterRegistrationValidation.inrollOrWithdrawCourseZodSchema,
  ),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withdrewFromCourse,
);

router.post(
  '/confirmMyRegistration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmMyRegistration,
);

router.post(
  '/:id/startNewSemester',
  auth(ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.startNewSemester,
);

export const SemesterRegistrationRouter = router;
