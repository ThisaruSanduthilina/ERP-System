import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "@/services/invoiceService";
import { useToast } from "@/hooks/use-toast";

interface CreateInvoiceFormProps {
  onClose: () => void;
  onVehicleSelect: () => void;
  selectedVehicle: any;
}

export const CreateInvoiceForm = ({ onClose, onVehicleSelect, selectedVehicle }: CreateInvoiceFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    customer_id: "",
    name: "",
    amount: "",
    status: "Unpaid" as const,
  });

  const createInvoiceMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a vehicle",
      });
      return;
    }

    createInvoiceMutation.mutate({
      customer_id: parseInt(formData.customer_id),
      name: formData.name,
      date: new Date().toISOString(),
      amount: parseFloat(formData.amount),
      status: formData.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer_id">Customer ID</Label>
          <Input
            id="customer_id"
            value={formData.customer_id}
            onChange={(e) => setFormData(prev => ({ ...prev, customer_id: e.target.value }))}
            placeholder="Enter customer ID"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Invoice Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter invoice name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Vehicle Details</Label>
        {selectedVehicle ? (
          <div className="p-4 border rounded-lg bg-white/50 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</h4>
                <p className="text-sm text-gray-600">Stock No: {selectedVehicle.stockNo}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onVehicleSelect}
              >
                Change Vehicle
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>Year: {selectedVehicle.year}</div>
              <div>Color: {selectedVehicle.color}</div>
              <div>VIN: {selectedVehicle.vin}</div>
              <div className="font-semibold text-purple-700">
                Price: ${selectedVehicle.price?.toLocaleString()}
              </div>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onVehicleSelect}
          >
            <Search className="mr-2 h-4 w-4" />
            Select Vehicle from Inventory
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
          placeholder="0.00"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-purple-600 hover:bg-purple-700"
          disabled={createInvoiceMutation.isPending}
        >
          {createInvoiceMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Invoice"
          )}
        </Button>
      </div>
    </form>
  );
};