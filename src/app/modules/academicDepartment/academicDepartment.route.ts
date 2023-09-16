import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academicDepartment',
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllDepartMents);

export const AcademicDepartmentRouter = router;
