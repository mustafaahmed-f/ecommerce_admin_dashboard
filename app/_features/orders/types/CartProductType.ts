export interface CartProduct {
  productID: string;
  title: string;
  unitPaymentPrice: number;
  discount: number;
  quantity: number;
  color: string | null;
  category: string | null;
  brand: string | null;
  image: string;
}
