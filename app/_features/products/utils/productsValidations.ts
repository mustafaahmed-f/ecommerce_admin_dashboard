import * as yup from "yup";

export const validations = yup.object({
  title: yup.string().required("Title is required"),

  image: yup
    .string()
    .url("Image must be a valid URL")
    .required("Image is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  description: yup.string().required("Description is required"),

  brand: yup.string().required("Brand is required"),

  model: yup.string().required("Model is required"),

  color: yup.string().nullable(),

  size: yup.string().nullable(),

  ram: yup.number().nullable().typeError("RAM must be a number"),

  power: yup.number().nullable().typeError("Power must be a number"),

  fps: yup.number().nullable().typeError("FPS must be a number"),

  soundOutput: yup
    .number()
    .nullable()
    .typeError("Sound Output must be a number"),

  screenSize: yup.number().nullable().typeError("Screen Size must be a number"),

  category: yup.string().required("Category is required"),

  discount: yup.number().default(0).min(0, "Discount cannot be negative"),

  stock: yup.number().default(10).min(0, "Stock cannot be negative"),
});
