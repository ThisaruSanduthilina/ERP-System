import { FreightForwarder } from "@/types/shipping";
import { API_URL } from "@/config";

export const createFreightForwarder = async (data: Omit<FreightForwarder, "id">): Promise<FreightForwarder> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/freight_forwarders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error(errorData.detail || 'Failed to create freight forwarder');
  }

  return response.json();
};

export const getFreightForwarders = async (skip = 0, limit = 100): Promise<FreightForwarder[]> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Authentication required');
  }

  console.log('Fetching freight forwarders with token:', token);

  const response = await fetch(
    `${API_URL}/freight_forwarders/?skip=${skip}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired. Please login again.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch freight forwarders');
  }

  const data = await response.json();
  console.log('Freight forwarders response:', data);
  return data;
};

export const deleteFreightForwarder = async (id: number): Promise<void> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/freight_forwarders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired. Please login again.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to delete freight forwarder');
  }
};