export type StripeTransaction = {
  id: string;
  created: number;
  merchant_name: string | null;
  merchant_category: string | null;
  amount: number;
  currency: string;
  type: string;
  cardholder: string;
};
