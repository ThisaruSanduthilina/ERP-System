export interface PurchaseItem {
  product_name: string;
  stock_quantity: number;
  expiry_date: string;
  batch_no: string;
  quantity: number;
  rate: number;
  discount_percent: number;
  discount_value: number;
  vat_percent: number;
  vat_value: number;
  total: number;
}

export interface Purchase {
  id?: number;
  supplier_id: number;
  purchase_date: string;
  challan_no: string;
  details: string;
  total_purchase_amount: number;
  total_discount: number;
  total_vat: number;
  grand_total: number;
  paid_amount: number;
  due_amount: number;
  payment_type: string;
  items: PurchaseItem[];
  status?: 'pending' | 'approved' | 'rejected';
  requester?: string;
}