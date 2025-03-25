export interface InventoryItem {
  id: number;
  stock_no: string;
  product_name: string;
  category: string;
  make: string;
  model: string;
  registration_year: number;
  price: number;
  location: string;
  chassis_number: string;
  engine_number: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  drive: string;
  colour: string;
  dimensions: string;
  quantity: number;
  image_url: string;
  created_at: string;
}

export interface InventoryFormData {
  stock_no: string;
  product_name: string;
  category: string;
  make: string;
  model: string;
  registration_year: number;
  price: number;
  location: string;
  chassis_number: string;
  engine_number: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  drive: string;
  colour: string;
  dimensions: string;
  quantity: number;
  image_url: string;
}