import { API_CONFIG, buildUrl } from '@/config/api';

export interface MaintenanceRecord {
  id?: number;
  inventory_item_id: number;
  description: string;
  date: string;
  cost: number;
  status: "Pending" | "In Progress" | "Completed";
}

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';
  
  if (!token) {
    throw new Error('No access token found - please login first');
  }

  return `${tokenType} ${token}`;
};

export const createMaintenance = async (data: MaintenanceRecord): Promise<MaintenanceRecord> => {
  try {
    console.log('Creating maintenance record:', data);
    
    const response = await fetch(buildUrl('/maintenances/'), {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to create maintenance record (Status: ${response.status})`);
    }

    const responseData = await response.json();
    console.log('Successfully created maintenance record:', responseData);
    return responseData;
  } catch (error) {
    console.error('Create maintenance error:', error);
    throw error;
  }
};

export const getMaintenanceRecords = async (skip: number = 0, limit: number = 100): Promise<MaintenanceRecord[]> => {
  try {
    console.log('Fetching maintenance records...');
    
    const response = await fetch(buildUrl(`/maintenances/?skip=${skip}&limit=${limit}`), {
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch maintenance records (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('Successfully fetched maintenance records:', data);
    return data;
  } catch (error) {
    console.error('Fetch maintenance error:', error);
    throw error;
  }
};