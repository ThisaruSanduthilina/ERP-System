import { API_CONFIG, handleApiResponse } from '@/config/api';

interface CreateInvoicePayload {
  customer_id: number;
  name: string;
  date: string;
  amount: number;
  status: 'Unpaid' | 'Paid' | 'Overdue';
}

interface Invoice {
  id: number;
  customer_id: number;
  name: string;
  date: string;
  amount: number;
  status: 'Unpaid' | 'Paid' | 'Overdue';
}

export const createInvoice = async (data: CreateInvoicePayload) => {
  const response = await fetch(`${API_CONFIG.baseURL}/invoices/`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch(`${API_CONFIG.baseURL}/invoices/`, {
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  return handleApiResponse(response);
};