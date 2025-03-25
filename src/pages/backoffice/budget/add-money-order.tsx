import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CreateMoneyOrderForm } from "@/components/backoffice/CreateMoneyOrderForm";

const AddMoneyOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const budgetId = searchParams.get("budgetId");

  if (!budgetId) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">No budget ID provided</p>
          <Button onClick={() => navigate("/backoffice/budget")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Budget Management
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/backoffice/budget")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Budget Management
        </Button>
      </div>
      <CreateMoneyOrderForm budgetId={parseInt(budgetId)} />
    </div>
  );
};

export default AddMoneyOrderPage;