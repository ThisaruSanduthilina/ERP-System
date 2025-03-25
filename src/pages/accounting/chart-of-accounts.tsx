import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AddAccountDialog } from "@/components/accounting/AddAccountDialog";
import { AccountsList } from "@/components/accounting/AccountsList";
import { useToast } from "@/components/ui/use-toast";

export default function ChartOfAccountsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: accounts, isLoading, refetch } = useQuery({
    queryKey: ['chart-of-accounts'],
    queryFn: async () => {
      const response = await fetch('/api/accountings/chart_of_accounts');
      if (!response.ok) throw new Error('Failed to fetch accounts');
      return response.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Chart of Accounts</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accounts List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading accounts...</div>
          ) : (
            <AccountsList accounts={accounts || []} />
          )}
        </CardContent>
      </Card>

      <AddAccountDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          refetch();
          toast({
            title: "Account created",
            description: "The account has been successfully created.",
          });
        }}
      />
    </div>
  );
}