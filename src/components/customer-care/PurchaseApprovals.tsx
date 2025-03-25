import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPurchaseForm } from "./NewPurchaseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Purchase } from "@/types/purchases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditPurchaseDialog } from "./purchase-form/EditPurchaseDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

const updatePurchaseStatus = async (id: number, status: 'approved' | 'rejected') => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update purchase status');
  }

  return response.json();
};

const deletePurchase = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete purchase');
  }
};

export const PurchaseApprovals = () => {
  const [open, setOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(null);
  
  const { data: purchases = [], refetch, isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
  });

  const handleSuccess = () => {
    setOpen(false);
    setEditPurchase(null);
    refetch();
    toast.success("Purchase updated successfully");
  };

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await updatePurchaseStatus(id, status);
      refetch();
      toast.success(`Purchase ${status} successfully`);
    } catch (error) {
      toast.error("Failed to update purchase status");
    }
  };

  const handleDelete = async () => {
    if (!selectedPurchaseId) return;
    
    try {
      await deletePurchase(selectedPurchaseId);
      refetch();
      toast.success("Purchase deleted successfully");
      setDeleteConfirmOpen(false);
    } catch (error) {
      toast.error("Failed to delete purchase");
    }
  };

  const openDeleteConfirm = (id: number) => {
    setSelectedPurchaseId(id);
    setDeleteConfirmOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading purchases...</div>;
  }

  const pendingPurchases = purchases.filter(p => p.status === 'pending');
  const historyPurchases = purchases.filter(p => p.status !== 'pending');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Purchase Approvals</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Purchase
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Purchase</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh]">
              <div className="p-4">
                <NewPurchaseForm onSuccess={handleSuccess} />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <EditPurchaseDialog
        purchase={editPurchase!}
        open={!!editPurchase}
        onOpenChange={(open) => !open && setEditPurchase(null)}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the purchase.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Challan No</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
                  <TableCell>{purchase.challan_no}</TableCell>
                  <TableCell>${purchase.grand_total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="warning">
                      {purchase.status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{purchase.payment_type}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleStatusUpdate(purchase.id!, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleStatusUpdate(purchase.id!, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditPurchase(purchase)}
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteConfirm(purchase.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="history">
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Challan No</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyPurchases.map((purchase) => (
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
                        {purchase.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{purchase.payment_type}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditPurchase(purchase)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteConfirm(purchase.id!)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};