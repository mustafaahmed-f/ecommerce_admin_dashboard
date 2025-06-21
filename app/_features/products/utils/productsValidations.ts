import {
  invalidNumberMsg,
  invalidUrlMsg,
  positiveNumberMsg,
  requiredFieldMsg,
} from "@/app/_utils/helperMethods/validationErrorMessages";
import * as yup from "yup";

export const validations = yup.object({
  title: yup.string().required(requiredFieldMsg("Title")),

  image: yup
    .string()
    .url(invalidUrlMsg())
    .required(requiredFieldMsg("Image URL")),

  price: yup
    .number()
    .typeError(invalidNumberMsg("Price"))
    .required(requiredFieldMsg("Price")),

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
