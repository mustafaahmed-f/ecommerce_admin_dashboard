export type usersType = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: "google" | "system";
  profileImage: string | null;
  cid?: string | null;
  role: "user" | "admin";
  phoneNumber?: string;
  address?: {
    unit_number?: number | null;
    street_number?: number | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    country?: string | null;
    geolocation?: {
      lat?: number | null;
      long?: number | null;
    };
  };
  createdAt?: string;
  updatedAt?: string;
};
