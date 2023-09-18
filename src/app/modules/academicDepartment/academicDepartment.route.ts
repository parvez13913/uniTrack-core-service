import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.get('/', AcademicDepartmentController.getAllDepartMents);

export const AcademicDepartmentRouter = router;
