import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { Purchase, PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerSection } from "./purchase-form/DatePickerSection";
import { API_URL } from "@/config";

interface NewPurchaseFormProps {
  onSuccess: () => void;
  initialData?: Purchase;
  mode?: 'create' | 'edit';
}

export const NewPurchaseForm = ({ onSuccess, initialData, mode = 'create' }: NewPurchaseFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [paymentType, setPaymentType] = useState<string>("credit");
  const [paidAmount, setPaidAmount] = useState<number>(0);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setDate(new Date(initialData.purchase_date));
      setItems(initialData.items);
      setPaymentType(initialData.payment_type);
      setPaidAmount(initialData.paid_amount);
    }
  }, [initialData, mode]);

  const addItem = () => {
    setItems([...items, {
      product_name: "",
      stock_quantity: 0,
      expiry_date: new Date().toISOString(),
      batch_no: "",
      quantity: 0,
      rate: 0,
      discount_percent: 0,
      discount_value: 0,
      vat_percent: 0,
      vat_value: 0,
      total: 0
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: string | number) => {
    const newItems = [...items];
    const item = { ...newItems[index] };

    // Type assertion to handle the field type properly
    (item[field] as string | number) = value;

    if (field === 'quantity' || field === 'rate' || field === 'discount_percent' || field === 'vat_percent') {
      // Calculate totals
      const subtotal = item.quantity * item.rate;
      item.discount_value = (subtotal * item.discount_percent) / 100;
      item.vat_value = ((subtotal - item.discount_value) * item.vat_percent) / 100;
      item.total = subtotal - item.discount_value + item.vat_value;
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const calculateTotals = () => {
    const totalPurchaseAmount = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discount_value, 0);
    const totalVat = items.reduce((sum, item) => sum + item.vat_value, 0);
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);
    
    return {
      totalPurchaseAmount,
      totalDiscount,
      totalVat,
      grandTotal
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    const totals = calculateTotals();
    const purchase: Purchase = {
      supplier_id: initialData?.supplier_id || 1,
      purchase_date: date.toISOString(),
      challan_no: initialData?.challan_no || "CH-" + Date.now(),
      details: initialData?.details || "Purchase order",
      total_purchase_amount: totals.totalPurchaseAmount,
      total_discount: totals.totalDiscount,
      total_vat: totals.totalVat,
      grand_total: totals.grandTotal,
      paid_amount: paidAmount,
      due_amount: totals.grandTotal - paidAmount,
      payment_type: paymentType,
      items: items,
      status: initialData?.status || 'pending'
    };

    try {
      if (!API_URL) {
        throw new Error('API URL is not configured');
      }

      const url = mode === 'edit' && initialData?.id 
        ? `${API_URL}/purchases/${initialData.id}`
        : `${API_URL}/purchases/`;

      const response = await fetch(url, {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchase),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} purchase`);
      }

      onSuccess();
      toast.success(`Purchase ${mode === 'edit' ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Purchase operation error:', error);
      toast.error(error instanceof Error ? error.message : `Failed to ${mode} purchase`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePickerSection date={date} onDateChange={(newDate) => setDate(newDate || new Date())} />

        <div>
          <Label>Payment Type</Label>
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Paid Amount</Label>
          <Input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Items</Label>
          <Button type="button" onClick={addItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 p-4 border rounded-lg">
            <div className="col-span-6 sm:col-span-2">
              <Label>Product Name</Label>
              <Input
                value={item.product_name}
                onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Rate</Label>
              <Input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input value={item.total.toFixed(2)} readOnly />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Total Amount</Label>
          <Input value={calculateTotals().grandTotal.toFixed(2)} readOnly />
        </div>
        <div>
          <Label>Due Amount</Label>
          <Input value={(calculateTotals().grandTotal - paidAmount).toFixed(2)} readOnly />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {mode === 'edit' ? 'Update' : 'Create'} Purchase
      </Button>
    </form>
  );
};