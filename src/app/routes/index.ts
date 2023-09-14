import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicSemesterRouter } from './../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academicSemesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
