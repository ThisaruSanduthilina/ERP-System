import { API_CONFIG, buildUrl } from '@/config/api';
import { InventoryFormData } from "@/types/inventory";

export interface InventoryItem extends InventoryFormData {
  id: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';
  
  if (!token) {
    throw new Error('No access token found - please login first');
  }

  return `${tokenType} ${token}`;
};

export const createInventoryItem = async (data: InventoryFormData, imageBlob?: Blob): Promise<InventoryItem> => {
  try {
    console.log('Creating inventory item with data:', data);
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    let imageData = null;
    if (imageBlob) {
      // Convert Blob to Base64
      const reader = new FileReader();
      imageData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageBlob);
      });
      console.log('Image converted to base64');
    }

    const response = await fetch(buildUrl('/inventory/'), {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        ...API_CONFIG.headers,
      },
      body: JSON.stringify({
        ...data,
        category: data.category || "Vehicle",
        quantity: data.quantity || 1,
        price: data.price || 0,
        supplier_id: data.supplier_id || 0,
        image_data: imageData
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions.';
        throw new Error(errorMessage);
      }

      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || `Failed to create inventory item (Status: ${response.status})`;
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log('Successfully created inventory item:', responseData);
    return responseData;
  } catch (error) {
    console.error('Create inventory error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the inventory service. Please check your network connection and try again.');
    }
    throw error;
  }
};

export const getInventoryItems = async (
  skip: number = 0,
  limit: number = 100
): Promise<InventoryItem[]> => {
  try {
    console.log('Fetching inventory items with params:', { skip, limit });
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    const timestamp = new Date().getTime();
    const response = await fetch(
      buildUrl(`/inventory/?skip=${skip}&limit=${limit}&_=${timestamp}`),
      {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          ...API_CONFIG.headers,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions.';
        throw new Error(errorMessage);
      }

      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || `Failed to fetch inventory items (Status: ${response.status})`;
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Successfully fetched inventory items:', data);
    return data;
  } catch (error) {
    console.error('Fetch inventory error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the inventory service. Please check your network connection and try again.');
    }
    throw error;
  }
};