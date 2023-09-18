import express from 'express';
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/create-building', BuildingController.createBuilding);

export const BuildingRouter = router;
