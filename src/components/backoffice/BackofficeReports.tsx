import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchAllBudgets } from "@/services/budgetService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const BackofficeReports = () => {
  const [selectedBudgetId, setSelectedBudgetId] = useState<number>(1);
  const { toast } = useToast();

  const { data: allBudgets, isLoading: isLoadingBudgets, error: budgetsError } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching budgets:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load budgets. Please try again later.",
        });
      }
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Metrics</CardTitle>
          <CardDescription>Overview of your invoice performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* All Monthly Budgets */}
      <Card>
        <CardHeader>
          <CardTitle>All Monthly Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingBudgets ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading budgets...</span>
            </div>
          ) : budgetsError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {budgetsError instanceof Error ? budgetsError.message : "Failed to load budgets"}
              </AlertDescription>
            </Alert>
          ) : allBudgets && allBudgets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Budget Amount</TableHead>
                  <TableHead>Remaining Budget</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allBudgets.map((budget) => (
                  <TableRow key={budget.id}>
                    <TableCell>
                      {format(new Date(budget.year, budget.month - 1), "MMMM")}
                    </TableCell>
                    <TableCell>{budget.year}</TableCell>
                    <TableCell>${budget.budget_amount.toLocaleString()}</TableCell>
                    <TableCell>${budget.remaining_budget.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(budget.created_at), "PPP")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-4">No budgets available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};