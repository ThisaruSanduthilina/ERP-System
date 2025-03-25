import { FinanceSection } from "@/components/dashboard/FinanceSection";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";

const FinancePage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Finance</h1>
      <FinanceSection />
      <FinancialGoals />
    </div>
  );
};

export default FinancePage;