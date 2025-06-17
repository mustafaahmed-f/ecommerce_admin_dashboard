import { Review } from "./reviewType";

export type Product = {
  _id: string;
  productId: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  size: string;
  rating: number;
  reviews: Review[];
  soundOutput: number;
  sold: number;
};
