import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Purchase } from "@/types/purchases";

const fetchPurchases = async (): Promise<Purchase[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch purchases');
  }
  
  return response.json();
};

export const PurchaseHistory = () => {
  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ['purchases-history'],
    queryFn: fetchPurchases,
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading purchase history...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Purchase History</h3>
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Challan No</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
                <TableCell>{purchase.challan_no}</TableCell>
                <TableCell>${purchase.grand_total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={
                    purchase.status === 'approved' ? 'success' : 
                    purchase.status === 'rejected' ? 'destructive' : 
                    'warning'
                  }>
                    {purchase.status || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>{purchase.payment_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};