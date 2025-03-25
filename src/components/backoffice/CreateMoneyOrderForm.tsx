import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { CreateMoneyOrderFormFields } from "./CreateMoneyOrderFormFields";
import { MoneyOrdersTable } from "./MoneyOrdersTable";

interface CreateMoneyOrderFormProps {
  budgetId: number;
}

export const CreateMoneyOrderForm = ({ budgetId }: CreateMoneyOrderFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch money orders for the current budget
  const { data: moneyOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["moneyOrders", budgetId],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${api.baseURL}/money-orders/?skip=0&limit=100`, {
        headers: {
          ...api.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch money orders');
      }
      return response.json();
    },
  });

  // Fetch individual money order details
  const fetchMoneyOrderDetails = async (orderId: number) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/money-orders/${orderId}`, {
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to fetch money order details`);
    }
    
    return response.json();
  };

  const createMoneyOrder = async (data: {
    monthly_budget_id: number;
    reason: string;
    amount: number;
  }) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/money-orders/`, {
      method: "POST",
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create money order");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createMoneyOrder,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Money order created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["moneyOrders", budgetId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: { reason: string; amount: number }) => {
    mutation.mutate({
      monthly_budget_id: budgetId,
      reason: data.reason,
      amount: data.amount,
    });
  };

  return (
    <div className="space-y-6">
      <CreateMoneyOrderFormFields
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
      />

      <div className="rounded-md border">
        <h2 className="text-lg font-semibold p-4 border-b">Money Orders</h2>
        <MoneyOrdersTable
          moneyOrders={moneyOrders}
          isLoading={isLoadingOrders}
          onViewDetails={fetchMoneyOrderDetails}
        />
      </div>
    </div>
  );
};