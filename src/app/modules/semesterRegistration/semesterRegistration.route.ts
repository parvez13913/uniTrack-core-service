import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/:id', SemesterRegistrationController.getSingleRegistration);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const SemesterRegistrationRouter = router;
