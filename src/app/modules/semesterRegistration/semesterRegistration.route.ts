import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  SemesterRegistrationController.createSemesterRegistration,
);

export const SemesterRegistrationRouter = router;
