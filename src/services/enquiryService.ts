import { API_CONFIG } from "@/config/api";

interface CreateEnquiryPayload {
  customer_id: number;
  details: string;
  date: string;
  status: string;
}

interface GetEnquiriesParams {
  skip?: number;
  limit?: number;
}

export const createEnquiry = async (payload: CreateEnquiryPayload) => {
  const token = localStorage.getItem('access_token');
  
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/enquiries`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to create enquiry: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating enquiry:', error);
    throw error;
  }
};

export const getEnquiries = async ({ skip = 0, limit = 100 }: GetEnquiriesParams = {}) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    console.log('Fetching enquiries from:', `${API_CONFIG.baseURL}/enquiries/?skip=${skip}&limit=${limit}`);
    
    const response = await fetch(
      `${API_CONFIG.baseURL}/enquiries/?skip=${skip}&limit=${limit}`,
      {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No authentication token found');
      }
      
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch enquiries: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error('Invalid content type:', contentType);
      const responseText = await response.text();
      console.error('Response body:', responseText);
      throw new Error(`Invalid response format: Server returned ${contentType || 'unknown'} instead of application/json`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};