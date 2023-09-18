import { z } from 'zod';

const createBuildingZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

const updateBuildingZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

export const BuildingValidation = {
  createBuildingZodSchema,
  updateBuildingZodSchema,
};
