import { z } from "zod";
import {
  invalidNumberMsg,
  invalidUrlMsg,
  minLengthMsg,
  positiveNumberMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import { objectIdRegex } from "@/app/_utils/constants/ObjectIdRegex";
import { ValidObjectId } from "@/app/_utils/helperMethods/ValidObjectId";

export const addNewProductSchema = z.object({
  title: z.string().min(3, minLengthMsg(3)).nonempty(requiredFieldMsg("Title")),

  image: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed",
        })
        .refine((file) => file.size <= 1024 * 1024, {
          message: "Image must be smaller than 1MB",
        }),
      z.string().url(invalidUrlMsg()),
    ])
    .refine((val) => val !== null, { message: "Image is required" }),

  price: z
    .number({ invalid_type_error: invalidNumberMsg("Price") })
    .refine((val) => val >= 1, {
      message: `${positiveNumberMsg("Price")} & min price 1`,
    }),
  description: z.string().nonempty(requiredFieldMsg("Description")),

  brand: z
    .string()
    .nonempty(requiredFieldMsg("Brand"))
    .regex(objectIdRegex, {
      message: ValidObjectId("Brand"),
    }),
  model: z
    .string()
    .nonempty(requiredFieldMsg("Model"))
    .regex(objectIdRegex, {
      message: ValidObjectId("Model"),
    }),
  category: z
    .string()
    .nonempty(requiredFieldMsg("Category"))
    .regex(objectIdRegex, {
      message: ValidObjectId("Category"),
    }),

  color: z.string().optional().nullable(),
  size: z.string().optional().nullable(),

  ram: z
    .number({ invalid_type_error: invalidNumberMsg("RAM") })
    .nullable()
    .optional(),
  power: z
    .number({ invalid_type_error: invalidNumberMsg("Power") })
    .nullable()
    .optional(),
  fps: z
    .number({ invalid_type_error: invalidNumberMsg("FPS") })
    .nullable()
    .optional(),
  screenSize: z
    .number({ invalid_type_error: invalidNumberMsg("Screen") })
    .nullable()
    .optional(),
  soundOutput: z
    .number({ invalid_type_error: invalidNumberMsg("Sound") })
    .nullable()
    .optional(),

  discount: z
    .number({ invalid_type_error: invalidNumberMsg("Discount") })
    .min(0, positiveNumberMsg("Discount"))
    .default(0),

  stock: z
    .number({ invalid_type_error: invalidNumberMsg("Stock") })
    .min(0, positiveNumberMsg("Stock"))
    .optional(),
});
