export interface notification {
  _id: string;
  event: string;
  message: string;
  userId: string;
  audience: string;
  read: boolean;
  url: string;
  createdAt: Date;
}
