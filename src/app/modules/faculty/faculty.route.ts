import express from 'express';
import { FacultController } from './faculty.controller';

const router = express.Router();

router.post('/create-faculty', FacultController.createFaculty);

router.patch('/:id', FacultController.updateFaculty);

router.get('/:id', FacultController.getSingleFaculty);

router.get('/', FacultController.getAllFaculties);

export const FacultyRouter = router;
