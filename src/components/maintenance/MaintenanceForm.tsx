import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MaintenanceFormFields } from "./MaintenanceFormFields";
import { MaintenanceRecord, createMaintenance } from "@/services/maintenanceService";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceFormProps {
  onSubmit: (data: MaintenanceRecord) => void;
}

export const MaintenanceForm = ({ onSubmit }: MaintenanceFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    inventory_item_id: 0,
    description: "",
    date: new Date().toISOString().split('T')[0],
    cost: 0,
    status: "Pending"
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.inventory_item_id) {
      newErrors.inventory_item_id = "Please select a vehicle";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.description) {
      newErrors.description = "Please enter a description";
    }

    if (formData.cost === undefined || formData.cost < 0) {
      newErrors.cost = "Please enter a valid cost";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await createMaintenance(formData as MaintenanceRecord);
        onSubmit(response);
        setIsOpen(false);
        setFormData({
          inventory_item_id: 0,
          description: "",
          date: new Date().toISOString().split('T')[0],
          cost: 0,
          status: "Pending"
        });
        toast({
          title: "Success",
          description: "Maintenance record created successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create maintenance record",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Maintenance Record
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add New Maintenance Record</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-1">
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <MaintenanceFormFields 
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Record
              </Button>
            </div>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};