export interface CartProduct {
  productID: number;
  title?: string;
  unitPaymentPrice: number;
  discount?: number;
  quantity: number;
  color?: string | null;
  category?: string | null;
  brand?: string | null;
  image?: string;
}
