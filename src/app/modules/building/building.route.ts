import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';

const router = express.Router();

router.post(
  '/create-building',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingValidation.createBuildingZodSchema),
  BuildingController.createBuilding,
);

router.patch('/:id', BuildingController.updateBuilding);

router.get('/:id', BuildingController.getSingleBuilding);

router.delete('/:id', BuildingController.deleteBuilding);

router.get('/', BuildingController.getAllBuilding);

export const BuildingRouter = router;
