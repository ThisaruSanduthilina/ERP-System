import { API_CONFIG } from "@/config/api";

export interface Customer {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  vat_no: string;
  phone: string;
  cr_no: string;
  address1: string;
  address2: string;
  fax: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface GetCustomersParams {
  skip?: number;
  limit?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const getCustomers = async ({ skip = 0, limit = 100 }: GetCustomersParams = {}) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...API_CONFIG.headers,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    console.log('Fetching customers from:', `${API_CONFIG.baseURL}/customers/?skip=${skip}&limit=${limit}`);
    
    const response = await fetchWithRetry(
      `${API_CONFIG.baseURL}/customers/?skip=${skip}&limit=${limit}`,
      { headers }
    );

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error('Invalid content type:', contentType);
      const responseText = await response.text();
      console.error('Response body:', responseText);
      throw new Error(`Invalid response format: Expected application/json but got ${contentType || 'unknown'}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (!Array.isArray(data)) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format: expected array of customers');
    }

    return data as Customer[];
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Add more detailed error information
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error: Please check your internet connection and ensure the API server is running');
    }
    throw error;
  }
};

export const updateCustomer = async (customerId: number, customerData: Partial<Customer>) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...API_CONFIG.headers,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const response = await fetchWithRetry(
      `${API_CONFIG.baseURL}/customers/${customerId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(customerData),
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: number) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...API_CONFIG.headers,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    await fetchWithRetry(
      `${API_CONFIG.baseURL}/customers/${customerId}`,
      {
        method: 'DELETE',
        headers,
      }
    );

    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};