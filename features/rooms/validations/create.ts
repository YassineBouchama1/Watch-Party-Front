import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(2, "name room is required"),
});

export type roomFormType = z.infer<typeof roomSchema>;
