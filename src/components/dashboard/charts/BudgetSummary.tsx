interface BudgetSummaryProps {
  totalSpent: number;
  totalBudget: number;
}

export const BudgetSummary = ({ totalSpent, totalBudget }: BudgetSummaryProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <p className="text-3xl font-bold text-gray-700">${totalSpent.toLocaleString()}</p>
      <p className="text-sm text-gray-500">of ${totalBudget.toLocaleString()}</p>
      <p className="text-xs text-gray-400 mt-1">Total Money Orders</p>
    </div>
  );
};