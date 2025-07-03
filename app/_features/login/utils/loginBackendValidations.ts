import { requiredFieldMsg } from "@/app/_utils/helperMethods/validationErrorMessages";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, requiredFieldMsg("Email")),
  password: z
    .string()
    .min(1, requiredFieldMsg("Password"))
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
});
