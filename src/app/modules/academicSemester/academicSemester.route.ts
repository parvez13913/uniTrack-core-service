import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemister,
);

router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);

router.patch('/:id', AcademicSemesterController.updateAcademicSemester);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRouter = router;
