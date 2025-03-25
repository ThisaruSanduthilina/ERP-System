import { API_CONFIG } from '@/config/api';

export const backofficeService = {
  async createInvoice(invoiceData: any) {
    const response = await fetch(`${API_CONFIG.baseURL}/invoices`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(invoiceData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }
    
    return response.json();
  },

  async calculateCosts(costData: any) {
    const response = await fetch(`${API_CONFIG.baseURL}/costs/calculate`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(costData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to calculate costs');
    }
    
    return response.json();
  },

  async getReports() {
    const response = await fetch(`${API_CONFIG.baseURL}/reports`, {
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    
    return response.json();
  }
};