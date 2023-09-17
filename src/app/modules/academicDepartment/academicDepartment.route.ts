import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academicDepartment',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllDepartMents);

export const AcademicDepartmentRouter = router;
