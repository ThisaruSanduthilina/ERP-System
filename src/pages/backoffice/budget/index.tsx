import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye, Plus, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateMonthlyBudget } from "@/services/budgetService";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");

  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${api.baseURL}/monthly-budgets/?skip=0&limit=100`, {
        headers: {
          ...api.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }
      return response.json();
    },
  });

  const updateBudgetMutation = useMutation({
    mutationFn: async ({ id, amount }: { id: number; amount: number }) => {
      return updateMonthlyBudget(id, { budget_amount: amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Budget amount updated successfully",
      });
      setEditingId(null);
      setEditAmount("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update budget amount",
        variant: "destructive",
      });
    },
  });

  const handleEditClick = (budget: any) => {
    setEditingId(budget.id);
    setEditAmount(budget.budget_amount.toString());
  };

  const handleSaveEdit = async (id: number) => {
    const amount = parseFloat(editAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid budget amount",
        variant: "destructive",
      });
      return;
    }
    updateBudgetMutation.mutate({ id, amount });
  };

  const handleAddBudget = () => {
    navigate("/backoffice/budget/add");
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Failed to load budgets"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <div className="flex gap-4">
          <Button onClick={handleAddBudget}>Add New Budget</Button>
          <Button 
            onClick={() => {
              if (budgets && budgets.length > 0) {
                navigate(`/backoffice/budget/add-money-order?budgetId=${budgets[0].id}`);
              } else {
                toast({
                  title: "Error",
                  description: "Please create a budget first",
                  variant: "destructive",
                });
              }
            }} 
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Money Order
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Remaining Budget</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets?.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.month}</TableCell>
                  <TableCell>{budget.year}</TableCell>
                  <TableCell>
                    {editingId === budget.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-32"
                        />
                        <Button 
                          size="sm"
                          onClick={() => handleSaveEdit(budget.id)}
                          disabled={updateBudgetMutation.isPending}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>${budget.budget_amount}</>
                    )}
                  </TableCell>
                  <TableCell>${budget.remaining_budget}</TableCell>
                  <TableCell>
                    {format(new Date(budget.created_at), "PPP")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/backoffice/budget/${budget.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {editingId !== budget.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(budget)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default BudgetManagementPage;