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
  color?: string | null;
  size?: string | null;
  category: string;
  discount: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: Review[];
  sold: number;
  ram?: string | null;
  power?: number | null;
  fps?: number | null;
  soundOutput?: number | null;
  screenSize?: number | null;
};
