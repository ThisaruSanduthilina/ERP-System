import { API_CONFIG } from "@/config/api";

export interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interested_in: string;
  notes: string;
}

export type CreateLeadDTO = Omit<Lead, 'id'>;

export const createLead = async (leadData: CreateLeadDTO) => {
  const response = await fetch(`${API_CONFIG.baseURL}/leads/`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create lead');
  }

  return response.json();
};

export const getLeads = async () => {
  const response = await fetch(`${API_CONFIG.baseURL}/leads/`, {
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch leads');
  }

  return response.json();
};