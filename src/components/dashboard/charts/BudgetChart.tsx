import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { fetchAllBudgets, updateMonthlyBudget } from "@/services/budgetService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useBudgetCalculations } from "@/hooks/useBudgetCalculations";
import { BudgetSummary } from "./BudgetSummary";

const getColorForIndex = (index: number) => {
  const colors = ["#1EAEDB", "#45B6E0", "#67C3E6", "#89D0EC", "#D3E4FD"];
  return colors[index % colors.length];
};

export const BudgetChart = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: budgets } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const currentBudget = budgets?.find(
    budget => budget.month === currentMonth && budget.year === currentYear
  );

  const { totalMoneyOrders, remainingBudget, spendingByReason } = useBudgetCalculations(currentBudget);

  const spendingData = Object.entries(spendingByReason).map(([reason, amount], index) => ({
    name: reason,
    value: amount,
    color: getColorForIndex(index)
  }));

  if (remainingBudget > 0) {
    spendingData.push({
      name: "Remaining",
      value: remainingBudget,
      color: getColorForIndex(spendingData.length)
    });
  }

  const handleBudgetAmountChange = (value: string) => {
    setNewBudgetAmount(value);
  };

  const handleSave = async () => {
    if (!currentBudget) return;

    try {
      const amount = parseFloat(newBudgetAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Error",
          description: "Please enter a valid budget amount",
          variant: "destructive",
        });
        return;
      }

      await updateMonthlyBudget(currentBudget.id, { budget_amount: amount });
      
      toast({
        title: "Success",
        description: "Budget amount updated successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update budget amount",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Monthly Budget Allocation
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="h-8 w-8"
        >
          {isEditing ? (
            <Save className="h-4 w-4 text-gray-600" />
          ) : (
            <Edit2 className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={95}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {spendingData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <BudgetSummary 
            totalSpent={totalMoneyOrders} 
            totalBudget={currentBudget?.budget_amount || 0} 
          />
        </div>

        {isEditing && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2 border p-3 rounded-lg">
              <label className="font-medium text-gray-700">Budget Amount</label>
              <Input
                type="number"
                value={newBudgetAmount}
                onChange={(e) => handleBudgetAmountChange(e.target.value)}
                className="h-8"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {spendingData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-sans text-gray-600">
                {item.name} {item.name !== "Remaining" && `($${item.value.toLocaleString()})`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};