import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/services/leadService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { LeadsList } from "@/components/leads/LeadsList";

const LeadsPage = () => {
  const navigate = useNavigate();
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: () => getLeads(),
  });

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading leads: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-900">Leads</h1>
        <Button 
          onClick={() => navigate("/customers/new")}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <LeadsList leads={leads} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsPage;