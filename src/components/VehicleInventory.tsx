import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { createInventoryItem } from "@/services/inventoryService";
import { useToast } from "@/components/ui/use-toast";

export const VehicleInventory = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...files]);
      
      // Create URLs for preview
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const inventoryData = {
        product_name: `${formData.get('make')} ${formData.get('model')}`,
        category: "Vehicle",
        quantity: 1,
        price: 0, // Add price field to form if needed
        supplier_id: 0, // Add supplier field to form if needed
        chassis_number: formData.get('chassis')?.toString() || "",
        engine_number: "", // Add engine number field if needed
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
        m3_size: "", // Calculate if needed
        stock_no: formData.get('stockNo')?.toString() || "",
        image_url: imageUrls[0] || "" // Using first image as main image
      };

      const response = await createInventoryItem(inventoryData);
      
      toast({
        title: "Success",
        description: "Vehicle added to inventory successfully",
      });

      // Clear form and images
      e.currentTarget.reset();
      setSelectedImages([]);
      setImageUrls([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add vehicle to inventory",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stockNo">Stock No.</Label>
              <Input id="stockNo" placeholder="e.g., 67192" className="bg-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" placeholder="e.g., Toyota" className="bg-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="e.g., Crown Crossover" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regYear">Reg. Year</Label>
              <Input id="regYear" placeholder="e.g., 2023/2" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" placeholder="e.g., Sedan" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" placeholder="e.g., G Advanced" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chassis">Chassis</Label>
              <Input id="chassis" placeholder="Enter chassis number" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage (km)</Label>
              <Input id="mileage" type="number" placeholder="e.g., 34000" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engine">Engine (cc)</Label>
              <Input id="engine" placeholder="e.g., 2,500" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select>
                <option>Automatic</option>
                <option>Manual</option>
                <option>CVT</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuel">Fuel Type</Label>
              <Select>
                <option>Gasoline</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
                <option>Gasoline/hybrid</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="steering">Steering</Label>
              <Select>
                <option>Right Hand</option>
                <option>Left Hand</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelNo">Model No</Label>
              <Input id="modelNo" placeholder="e.g., 6AA-AZSH35" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drive">Drive</Label>
              <Select>
                <option>4WD</option>
                <option>2WD</option>
                <option>AWD</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Seats</Label>
              <Input id="seats" type="number" placeholder="e.g., 5" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doors">Doors</Label>
              <Input id="doors" type="number" placeholder="e.g., 4" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" placeholder="e.g., Gray" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Japan » Yokohama" className="bg-white" />
            </div>

            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="dimensions">Dimensions</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input id="length" placeholder="Length (cm)" className="bg-white" />
                <Input id="width" placeholder="Width (cm)" className="bg-white" />
                <Input id="height" placeholder="Height (cm)" className="bg-white" />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>Vehicle Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Vehicle preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-purple-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 cursor-pointer bg-white/50 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <ImagePlus className="h-8 w-8 text-purple-500" />
                  <span className="text-sm text-purple-600">Add Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Add Vehicle</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
