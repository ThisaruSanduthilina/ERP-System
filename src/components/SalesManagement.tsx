import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { VehicleSelectionModal } from "./sales/VehicleSelectionModal";
import { Search } from "lucide-react";
import { SelectedVehicleDisplay } from "./sales/SelectedVehicleDisplay";
import { OrderData } from "@/services/orderService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SalesManagementProps {
  onSubmit: (data: OrderData) => Promise<void>;
  isSubmitting: boolean;
}

const getRoleId = (role: string): number => {
  const roleMap: { [key: string]: number } = {
    'admin': 1,
    'sales': 2,
    'user': 3,
    'shipping': 4,
    'purchasing': 5,
    'accounting': 6
  };
  return roleMap[role] || 3; // Default to user role if not found
};

export const SalesManagement = ({ onSubmit, isSubmitting }: SalesManagementProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    address: "",
    email: "",
    dateOfBirth: "",
    occupation: "",
    alternatePhone: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    idType: "",
    idNumber: "",
  });

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a vehicle before submitting",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to create an order",
      });
      return;
    }

    const roleId = getRoleId(user.role);
    
    const orderData: OrderData = {
      customer_id: 1, // This should be dynamically set based on customer selection
      contact_number: formData.contactNumber,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`,
      date: new Date().toISOString(),
      total: selectedVehicle.price || 0,
      status: "Pending",
      role_id: roleId,
      items: [
        {
          item_name: `${selectedVehicle.make} ${selectedVehicle.model}`,
          quantity: 1,
          price: selectedVehicle.price,
          total: selectedVehicle.price,
        },
      ],
    };

    try {
      await onSubmit(orderData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>New Sales Order</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-700">Customer Information</h3>
                
                {/* Personal Information */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input 
                    id="customerName" 
                    placeholder="Full Name" 
                    className="bg-white" 
                    value={formData.customerName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="dateOfBirth" 
                      type="date" 
                      className="bg-white" 
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input 
                      id="occupation" 
                      placeholder="Occupation" 
                      className="bg-white" 
                      value={formData.occupation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-white" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Primary Phone</Label>
                    <Input 
                      id="contactNumber" 
                      placeholder="Primary Phone" 
                      className="bg-white" 
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input 
                      id="alternatePhone" 
                      placeholder="Alternate Phone" 
                      className="bg-white" 
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                {/* Address Information */}
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Street Address" 
                    className="bg-white" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="City" 
                      className="bg-white" 
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input 
                      id="state" 
                      placeholder="State/Province" 
                      className="bg-white" 
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      id="postalCode" 
                      placeholder="Postal Code" 
                      className="bg-white" 
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      placeholder="Country" 
                      className="bg-white" 
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Identification */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <select 
                      id="idType" 
                      className="w-full rounded-md border border-input bg-white px-3 py-2"
                      value={formData.idType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select ID Type</option>
                      <option value="passport">Passport</option>
                      <option value="driverLicense">Driver's License</option>
                      <option value="nationalId">National ID</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input 
                      id="idNumber" 
                      placeholder="ID Number" 
                      className="bg-white" 
                      value={formData.idNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle & Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-700">Vehicle & Payment Details</h3>
                
                {/* Vehicle Selection Section */}
                <div className="space-y-2">
                  <Label>Vehicle Selection</Label>
                  {selectedVehicle ? (
                    <SelectedVehicleDisplay
                      vehicle={selectedVehicle}
                      onChangeVehicle={() => setShowVehicleModal(true)}
                    />
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowVehicleModal(true)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Select Vehicle from Inventory
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select id="paymentMethod" className="w-full rounded-md border border-input bg-white px-3 py-2">
                    <option>Cash</option>
                    <option>Finance</option>
                    <option>Lease</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any special requirements or notes" className="bg-white" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">Cancel</Button>
              <Button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!selectedVehicle || isSubmitting}
              >
                {isSubmitting ? "Creating Order..." : "Create Sales Order"}
              </Button>
            </div>
          </form>
        </ScrollArea>

        <VehicleSelectionModal
          open={showVehicleModal}
          onClose={() => setShowVehicleModal(false)}
          onSelect={handleVehicleSelect}
        />
      </CardContent>
    </Card>
  );
};
