export interface apiResponseType {
  success: boolean;
  message: string;
  result: any;
  additionalInfo?: any;
  error?: string;
}

export interface crudResponseType {
  result: any;
  additionalInfo?: any;
}
