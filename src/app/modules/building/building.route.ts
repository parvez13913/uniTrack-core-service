import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';

const router = express.Router();

router.get('/', BuildingController.getAllBuilding);
router.get('/:id', BuildingController.getSingleBuilding);

router.post(
  '/create-building',
  validateRequest(BuildingValidation.createBuildingZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.createBuilding,
);

router.patch(
  '/:id',
  validateRequest(BuildingValidation.updateBuildingZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.updateBuilding,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BuildingController.deleteBuilding,
);

export const BuildingRouter = router;
