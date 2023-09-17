import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentZodSchema),
  StudentController.createStudent,
);

router.patch('/:id', StudentController.updateStudent);

router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudents);

export const StudentRouter = router;
