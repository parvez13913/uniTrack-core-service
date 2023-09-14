import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academicSemester',
  AcademicSemesterController.createAcademicSemister,
);

export const AcademicSemesterRouter = router;
