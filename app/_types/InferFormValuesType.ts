import * as yup from "yup";

export type InferFormValues<T extends yup.AnySchema> = yup.InferType<T>;
