import { format } from "date-fns";
import { Loader2, Eye } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface MoneyOrder {
  id: number;
  reason: string;
  amount: number;
  status: string;
  created_at: string;
}

interface MoneyOrderDetails extends MoneyOrder {
  monthly_budget_id: number;
}

interface MoneyOrdersTableProps {
  moneyOrders?: MoneyOrder[];
  isLoading: boolean;
  onViewDetails: (orderId: number) => Promise<MoneyOrderDetails>;
}

export const MoneyOrdersTable = ({ 
  moneyOrders, 
  isLoading,
  onViewDetails 
}: MoneyOrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<MoneyOrderDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = async (orderId: number) => {
    try {
      const details = await onViewDetails(orderId);
      setSelectedOrder(details);
      setIsDetailsOpen(true);
    } catch (error: any) {
      // Check if it's a 404 error
      const errorMessage = error.message?.includes("404") 
        ? "Money order not found" 
        : "Failed to fetch money order details";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reason</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moneyOrders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.reason}</TableCell>
              <TableCell>${order.amount.toLocaleString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {format(new Date(order.created_at), "PPP")}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(order.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {(!moneyOrders || moneyOrders.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No money orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Money Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm">Reason</p>
                  <p>{selectedOrder.reason}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Amount</p>
                  <p>${selectedOrder.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Status</p>
                  <p>{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Created At</p>
                  <p>{format(new Date(selectedOrder.created_at), "PPP")}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Budget ID</p>
                  <p>{selectedOrder.monthly_budget_id}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};