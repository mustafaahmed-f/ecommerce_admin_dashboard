import {
  invalidNumberMsg,
  minLengthMsg,
  positiveNumberMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import * as yup from "yup";

const MAX_IMAGE_SIZE_MB = 1;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export const validations = yup.object({
  title: yup
    .string()
    .required(requiredFieldMsg("Title"))
    .min(3, minLengthMsg(3)),

  image: yup
    .mixed<File | string>()
    .required("Image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        (value instanceof File && value.type.startsWith("image/")) ||
        typeof value === "string"
      );
    })
    .test(
      "fileSize",
      `Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB`,
      (value) => {
        if (value instanceof File) return value.size <= MAX_IMAGE_SIZE_BYTES;
        return true; // ✅ Skip size check for string or null values
      },
    ),
  price: yup
    .number()
    .typeError(invalidNumberMsg("Price"))
    .required(requiredFieldMsg("Price"))
    .test("minPrice", "Price should be at least 1", (val) => val >= 1),

  description: yup.string().required(requiredFieldMsg("Description")),

  brand: yup.string().required(requiredFieldMsg("Brand")),

  model: yup.string().required(requiredFieldMsg("Model")),

  color: yup.string().nullable(),

  size: yup.string().nullable(),

  ram: yup.number().nullable().typeError(invalidNumberMsg("RAM")),

  power: yup.number().nullable().typeError(invalidNumberMsg("Power")),

  fps: yup.number().nullable().typeError(invalidNumberMsg("FPS")),

  soundOutput: yup.number().nullable().typeError(invalidNumberMsg("Sound")),

  screenSize: yup.number().nullable().typeError(invalidNumberMsg("Screen")),

  category: yup.string().required(requiredFieldMsg("Category")),

  discount: yup.number().default(0).min(0, positiveNumberMsg("Discount")),

  stock: yup.number().min(0, positiveNumberMsg("Stock")),
});
