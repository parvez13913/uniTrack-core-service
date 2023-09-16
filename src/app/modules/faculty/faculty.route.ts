import express from 'express';
import { FacultController } from './faculty.controller';

const router = express.Router();

router.post('create-faculty', FacultController.createFaculty);

export const FacultyRouter = router;
