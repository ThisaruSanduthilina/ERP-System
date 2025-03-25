import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceRecord {
  id: number;
  date: string;
  serviceType: string;
  technician: string;
  cost: number;
}

export const ServiceHistory = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([
    {
      id: 1,
      date: "2024-02-20",
      serviceType: "Tire Rotation",
      technician: "Mike Brown",
      cost: 50.00
    },
    {
      id: 2,
      date: "2024-01-15",
      serviceType: "Oil Change",
      technician: "David Wilson",
      cost: 45.00
    }
  ]);

  const [formData, setFormData] = useState({
    date: "",
    serviceType: "",
    technician: "",
    cost: ""
  });

  const handleAddServiceHistory = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ServiceRecord = {
      id: serviceRecords.length + 1,
      date: formData.date,
      serviceType: formData.serviceType,
      technician: formData.technician,
      cost: parseFloat(formData.cost)
    };

    setServiceRecords([...serviceRecords, newRecord]);
    setIsDialogOpen(false);
    setFormData({
      date: "",
      serviceType: "",
      technician: "",
      cost: ""
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Service History</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Service History</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddServiceHistory} className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="grid w-full gap-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oil Change">Oil Change</SelectItem>
                    <SelectItem value="Tire Rotation">Tire Rotation</SelectItem>
                    <SelectItem value="Brake Service">Brake Service</SelectItem>
                    <SelectItem value="General Maintenance">General Maintenance</SelectItem>
                    <SelectItem value="Engine Tune-up">Engine Tune-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full gap-2">
                <Label htmlFor="technician">Technician</Label>
                <Select
                  value={formData.technician}
                  onValueChange={(value) => setFormData({ ...formData, technician: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mike Brown">Mike Brown</SelectItem>
                    <SelectItem value="David Wilson">David Wilson</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="Tom Smith">Tom Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full gap-2">
                <Label htmlFor="cost">Cost ($)</Label>
                <Input
                  type="number"
                  id="cost"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">Add Service Record</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Service History Table */}
      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Service Type</th>
              <th scope="col" className="px-6 py-3">Technician</th>
              <th scope="col" className="px-6 py-3">Cost</th>
            </tr>
          </thead>
          <tbody>
            {serviceRecords.map((record) => (
              <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{record.date}</td>
                <td className="px-6 py-4">{record.serviceType}</td>
                <td className="px-6 py-4">{record.technician}</td>
                <td className="px-6 py-4">${record.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceHistory;