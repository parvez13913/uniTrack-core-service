import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academicDepartment',
  AcademicDepartmentController.createAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
