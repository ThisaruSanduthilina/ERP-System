import { api } from "@/config/api";

export interface MonthlyBudget {
  id: number;
  month: number;
  year: number;
  budget_amount: number;
  remaining_budget: number;
  created_at: string;
  money_orders?: {
    id: number;
    monthly_budget_id: number;
    reason: string;
    amount: number;
    status: string;
    created_at: string;
  }[];
}

export const createMonthlyBudget = async (budget: Omit<MonthlyBudget, "id" | "remaining_budget" | "created_at" | "money_orders">) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/monthly-budgets/`, {
      method: 'POST',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(budget),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create budget');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating monthly budget:', error);
    throw error;
  }
};

export const updateMonthlyBudget = async (
  budgetId: number,
  budget: Partial<Pick<MonthlyBudget, "budget_amount">>
) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
    method: 'PATCH',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.detail || `Failed to update budget`);
  }

  return await response.json();
};

export const fetchAllBudgets = async (): Promise<MonthlyBudget[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${api.baseURL}/monthly-budgets/?skip=0&limit=100`, {
    method: 'GET',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch budgets');
  }

  const data = await response.json();
  console.log('Budgets response:', data);
  return data;
};

export const getMonthlyBudgetDetails = async (budgetId: number): Promise<MonthlyBudget> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
    method: 'GET',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `Failed to fetch budget details for ID ${budgetId}`);
  }

  return await response.json();
};