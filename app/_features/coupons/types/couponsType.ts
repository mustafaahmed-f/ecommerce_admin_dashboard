export type couponType = {
  _id: string;
  addedBy: string;
  code: string;
  discount: number;
  discountType: "percentage" | "amount";
  expirationDate: string;
  usageLimit: number;
  usageCount: number;
  applicableProducts: string[];
  applicableCategories: string[];
  isActive: boolean;
  stripeCouponId: string;
  stipePromotionCodeId: string;
  createdAt: string;
  updatedAt: string;
};
