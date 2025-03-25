export interface Bank {
  id?: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  signature_picture?: string;
  balance: number;
}

export interface BankFormData {
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  signature_picture: string;
  balance: number;
}