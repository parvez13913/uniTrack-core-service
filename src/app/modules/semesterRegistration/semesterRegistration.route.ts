import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationZodSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMySemesterRegistration,
);

router.post(
  '/enroll-into-course',
  validateRequest(
    SemesterRegistrationValidation.inrollOrWithdrawCourseZodSchema,
  ),
  SemesterRegistrationController.enrollIntoCourse,
);
router.post(
  '/withdraw-from-course',
  validateRequest(
    SemesterRegistrationValidation.inrollOrWithdrawCourseZodSchema,
  ),
  SemesterRegistrationController.withdrewFromCourse,
);

router.post(
  '/confirm-my-registration',
  SemesterRegistrationController.confirmMyRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationZodSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const SemesterRegistrationRouter = router;
