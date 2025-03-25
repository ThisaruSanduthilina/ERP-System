import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InventoryFormData } from "@/types/inventory";

interface VehicleFormProps {
  children: React.ReactNode;
  onSubmit: (data: InventoryFormData) => void;
  isSubmitting: boolean;
}

export const VehicleForm = ({ children, onSubmit, isSubmitting }: VehicleFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: InventoryFormData = {
      product_name: `${formData.get('make')} ${formData.get('model')}`,
      category: "Vehicle",
      quantity: 1,
      price: Number(formData.get('price')) || 0,
      supplier_id: Number(formData.get('supplier_id')) || 0,
      chassis_number: formData.get('chassis')?.toString() || "",
      engine_number: formData.get('engine')?.toString() || "",
      mileage: Number(formData.get('mileage')) || 0,
      registration_year: Number(formData.get('regYear')) || 0,
      evaluation_grade: formData.get('grade')?.toString() || "",
      make: formData.get('make')?.toString() || "",
      model: formData.get('model')?.toString() || "",
      fuel_type: formData.get('fuel')?.toString() || "",
      transmission: formData.get('transmission')?.toString() || "",
      steering: formData.get('steering')?.toString() || "",
      drive: formData.get('drive')?.toString() || "",
      seats: Number(formData.get('seats')) || 0,
      doors: Number(formData.get('doors')) || 0,
      colour: formData.get('color')?.toString() || "",
      location: formData.get('location')?.toString() || "",
      dimensions: `${formData.get('length')}x${formData.get('width')}x${formData.get('height')}`,
      m3_size: "",
      stock_no: formData.get('stockNo')?.toString() || "",
      image_url: ""
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="stockNo">Stock No.</Label>
          <Input id="stockNo" name="stockNo" placeholder="e.g., 67192" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input id="make" name="make" placeholder="e.g., Toyota" className="bg-white" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" placeholder="e.g., Crown Crossover" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" placeholder="e.g., 25000" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier_id">Supplier ID</Label>
          <Input id="supplier_id" name="supplier_id" type="number" placeholder="e.g., 123" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regYear">Reg. Year</Label>
          <Input id="regYear" name="regYear" placeholder="e.g., 2023/2" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Input id="grade" name="grade" placeholder="e.g., G Advanced" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chassis">Chassis</Label>
          <Input id="chassis" name="chassis" placeholder="Enter chassis number" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="engine">Engine Number</Label>
          <Input id="engine" name="engine" placeholder="Enter engine number" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mileage">Mileage (km)</Label>
          <Input id="mileage" name="mileage" type="number" placeholder="e.g., 34000" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select name="transmission" defaultValue="Automatic">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select name="fuel" defaultValue="Gasoline">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gasoline">Gasoline</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Gasoline/hybrid">Gasoline/hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="steering">Steering</Label>
          <Select name="steering" defaultValue="Right Hand">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select steering" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Right Hand">Right Hand</SelectItem>
              <SelectItem value="Left Hand">Left Hand</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="drive">Drive</Label>
          <Select name="drive" defaultValue="4WD">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select drive type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4WD">4WD</SelectItem>
              <SelectItem value="2WD">2WD</SelectItem>
              <SelectItem value="AWD">AWD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seats">Seats</Label>
          <Input id="seats" name="seats" type="number" placeholder="e.g., 5" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doors">Doors</Label>
          <Input id="doors" name="doors" type="number" placeholder="e.g., 4" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" placeholder="e.g., Gray" className="bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g., Japan » Yokohama" className="bg-white" />
        </div>

        <div className="space-y-2 lg:col-span-3">
          <Label htmlFor="dimensions">Dimensions</Label>
          <div className="grid grid-cols-3 gap-4">
            <Input id="length" name="length" placeholder="Length (cm)" className="bg-white" />
            <Input id="width" name="width" placeholder="Width (cm)" className="bg-white" />
            <Input id="height" name="height" placeholder="Height (cm)" className="bg-white" />
          </div>
        </div>
      </div>

      {children}
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button 
          type="submit" 
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Vehicle'}
        </Button>
      </div>
    </form>
  );
};