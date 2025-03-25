import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateMoneyOrderForm } from "@/components/backoffice/CreateMoneyOrderForm";
import {
  getMonthlyBudgetDetails,
  updateMonthlyBudget,
  type MonthlyBudget,
} from "@/services/budgetService";

const BudgetDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newBudgetAmount, setNewBudgetAmount] = useState<string>("");

  const { data: budget, isLoading, error } = useQuery({
    queryKey: ["budget", id],
    queryFn: () => getMonthlyBudgetDetails(Number(id)),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (newAmount: number) =>
      updateMonthlyBudget(Number(id), { budget_amount: newAmount }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Budget amount updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["budget", id] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setNewBudgetAmount("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update budget",
        variant: "destructive",
      });
    },
  });

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetAmount) {
      toast({
        title: "Error",
        description: "Please enter a new budget amount",
        variant: "destructive",
      });
      return;
    }
    const amount = parseFloat(newBudgetAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid budget amount",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate(amount);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading budget details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load budget details"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Budget not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Details</h1>
        <Button variant="outline" onClick={() => navigate("/backoffice/budget")}>
          Back to List
        </Button>
      </div>

      <CreateMoneyOrderForm budgetId={budget.id} />

      <Card className="p-6 mb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label>Month</Label>
            <p className="text-lg">
              {format(new Date(budget.year, budget.month - 1), "MMMM")}
            </p>
          </div>
          <div>
            <Label>Year</Label>
            <p className="text-lg">{budget.year}</p>
          </div>
          <div>
            <Label>Current Budget Amount</Label>
            <p className="text-lg">${budget.budget_amount.toLocaleString()}</p>
          </div>
          <div>
            <Label>Remaining Budget</Label>
            <p className="text-lg">${budget.remaining_budget.toLocaleString()}</p>
          </div>
          <div>
            <Label>Created At</Label>
            <p className="text-lg">{format(new Date(budget.created_at), "PPP")}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Update Budget Amount</h2>
        <form onSubmit={handleUpdateBudget} className="space-y-4">
          <div>
            <Label htmlFor="newBudgetAmount">New Budget Amount</Label>
            <Input
              id="newBudgetAmount"
              type="number"
              value={newBudgetAmount}
              onChange={(e) => setNewBudgetAmount(e.target.value)}
              placeholder="Enter new budget amount"
              min="0"
              step="0.01"
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Budget"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BudgetDetailsPage;