import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { StudentRouter } from '../modules/student/student.route';
import { AcademicSemesterRouter } from './../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academicSemesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academicFaculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academicDepartments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
