export interface StripeTransaction {
  id: string;
  created: number;
  status: string;
  amount: number;
  currency: string;
  payment_method_types: string[];
  amount_received: number;
  latest_charge: string | null;
}
