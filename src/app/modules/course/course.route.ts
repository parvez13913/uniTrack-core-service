import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/create-course', CourseController.createCourse);

router.patch('/:id', CourseController.updateCourse);

router.get('/:id', CourseController.getSingleCourse);

router.get('/', CourseController.getAllCourses);

export const CourseRouter = router;
