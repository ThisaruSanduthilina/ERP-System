import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VehicleSelectionModal } from "../sales/VehicleSelectionModal";
import { InvoiceList } from "./InvoiceList";
import { CreateInvoiceForm } from "./CreateInvoiceForm";

export const InvoiceManagement = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Invoice Management</h2>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Dialog open={showNewInvoice} onOpenChange={setShowNewInvoice}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <CreateInvoiceForm
                  onClose={() => {
                    setShowNewInvoice(false);
                    setSelectedVehicle(null);
                  }}
                  onVehicleSelect={() => setShowVehicleModal(true)}
                  selectedVehicle={selectedVehicle}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <InvoiceList />
          </CardContent>
        </Card>
      </div>

      <VehicleSelectionModal
        open={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onSelect={handleVehicleSelect}
      />
    </div>
  );
};