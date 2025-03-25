import { API_CONFIG, buildUrl } from "@/config/api";

export interface FollowUp {
  id?: number;
  customer: string;
  type: string;
  date: string;
  time: string;
  status: string;
  lead_id: number;
  user_id: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    ...API_CONFIG.headers,
    'Authorization': `Bearer ${token}`
  };
};

export const createFollowUp = async (followUp: Omit<FollowUp, 'id'>) => {
  const response = await fetch(buildUrl('/follow-ups/'), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(followUp)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create follow-up');
  }

  return response.json();
};

export const updateFollowUp = async (id: number, followUp: Omit<FollowUp, 'id'>) => {
  const response = await fetch(buildUrl(`/follow-ups/${id}`), {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(followUp)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update follow-up');
  }

  return response.json();
};

export const getFollowUps = async () => {
  const response = await fetch(buildUrl('/follow-ups/'), {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch follow-ups');
  }

  return response.json();
};