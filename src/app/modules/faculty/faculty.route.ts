import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultController.createFaculty,
);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultController.updateFaculty,
);

router.get('/:id', FacultController.getSingleFaculty);

router.delete('/:id', FacultController.deleteFaculty);

router.get('/', FacultController.getAllFaculties);

export const FacultyRouter = router;
