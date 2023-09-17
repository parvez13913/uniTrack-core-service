import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academicFaculty',
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.patch('/:id', AcademicFacultyController.updateAcademicFaculty);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRouter = router;
