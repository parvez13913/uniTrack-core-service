import { z } from 'zod';

const createRoomZodSchema = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Room Number is Required',
    }),
    floor: z.string({
      required_error: 'Floor is Required',
    }),
    buildingId: z.string({
      required_error: 'Building Id is Required',
    }),
  }),
});

export const RoomValidation = {
  createRoomZodSchema,
};
