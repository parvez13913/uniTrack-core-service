import express from 'express';
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/create-building', BuildingController.createBuilding);
router.get('/', BuildingController.getAllBuilding);

export const BuildingRouter = router;
