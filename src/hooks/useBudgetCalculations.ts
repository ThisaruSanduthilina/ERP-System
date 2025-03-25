import { MonthlyBudget } from "@/services/budgetService";

export const useBudgetCalculations = (currentBudget: MonthlyBudget | undefined) => {
  const calculateTotalMoneyOrders = () => {
    if (!currentBudget?.money_orders) return 0;
    return currentBudget.money_orders.reduce((total, order) => total + order.amount, 0);
  };

  const calculateRemainingBudget = () => {
    if (!currentBudget) return 0;
    const totalSpent = calculateTotalMoneyOrders();
    return currentBudget.budget_amount - totalSpent;
  };

  const groupMoneyOrdersByReason = () => {
    if (!currentBudget?.money_orders) return {};
    
    return currentBudget.money_orders.reduce((acc: Record<string, number>, order) => {
      if (!acc[order.reason]) {
        acc[order.reason] = 0;
      }
      acc[order.reason] += order.amount;
      return acc;
    }, {});
  };

  return {
    totalMoneyOrders: calculateTotalMoneyOrders(),
    remainingBudget: calculateRemainingBudget(),
    spendingByReason: groupMoneyOrdersByReason()
  };
};