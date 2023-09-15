import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academicFaculty',
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRouter = router;
