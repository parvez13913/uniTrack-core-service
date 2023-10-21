import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-mark',
  StudentEnrolledCourseMarkController.updateStudentMarks,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarkController.getAllStudentEnrolledCourseMarks,
);

export const StudentEnrolledCourseMarkRoute = router;
