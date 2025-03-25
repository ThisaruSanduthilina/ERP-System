import { API_CONFIG } from "@/config/api";
import { Purchase } from "@/types/purchases";

export const createPurchase = async (purchase: Purchase) => {
  const response = await fetch(`${API_CONFIG.baseURL}/purchases/`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify(purchase)
  });

  if (!response.ok) {
    throw new Error('Failed to create purchase');
  }

  return response.json();
};