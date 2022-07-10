import { z } from "zod";

export const Author = z.object({
  avatar: z.string(),
  email: z.string().email(),
  name: z.string(),
});
