import { API_URL } from '@/config';

interface ServiceData {
  service_name: string;
  charge: number;
  service_vat_percent: number;
  description: string;
}

export const createService = async (data: ServiceData) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Creating service with data:', data);

  const response = await fetch(`${API_URL}/services/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Service creation failed:', errorData);
    throw new Error(`Failed to create service: ${response.statusText}`);
  }

  return response.json();
};

export const getServices = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Fetching services...');

  const response = await fetch(`${API_URL}/services/?skip=0&limit=100`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Service fetch failed:', errorData);
    throw new Error(`Failed to fetch services: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Services fetched:', data);
  return data;
};