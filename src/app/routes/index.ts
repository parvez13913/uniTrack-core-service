import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { BuildingRouter } from '../modules/building/building.route';
import { CourseRouter } from '../modules/course/course.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { OfferedCourseRouter } from '../modules/offeredCourse/offeredCourse.route';
import { OfferedCourseSectionRouter } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { RoomRouter } from '../modules/room/room.route';
import { SemesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.route';
import { StudentRouter } from '../modules/student/student.route';
import { StudentEnrolledCourseMarkRoute } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.route';
import { AcademicSemesterRouter } from './../modules/academicSemester/academicSemester.route';
import { OfferedCourseClassScheduleRouter } from './../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';

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
  {
    path: '/buildings',
    route: BuildingRouter,
  },
  {
    path: '/rooms',
    route: RoomRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/semesterRegistrations',
    route: SemesterRegistrationRouter,
  },
  {
    path: '/offeredCourses',
    route: OfferedCourseRouter,
  },
  {
    path: '/offered-courses-sections',
    route: OfferedCourseSectionRouter,
  },
  {
    path: '/offered-courses-class-schedules',
    route: OfferedCourseClassScheduleRouter,
  },
  {
    path: '/student-enrolled-course-marks',
    route: StudentEnrolledCourseMarkRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
