export interface apiResponseType {
  success: boolean;
  message: string;
  result: any;
  additionalInfo?: any;
  error?: string;
  errors?: any;
}

export interface crudResponseType {
  success: boolean;
  message: string;
  result: any;
  additionalInfo?: any;
}
