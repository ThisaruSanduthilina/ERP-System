import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";
import { MaintenanceStats } from "@/components/maintenance/MaintenanceStats";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";
import { MaintenanceRecord, getMaintenanceRecords } from "@/services/maintenanceService";
import { useToast } from "@/hooks/use-toast";

const MaintenancePage = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchRecords = async () => {
    try {
      const data = await getMaintenanceRecords();
      setRecords(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch maintenance records",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddRecord = (data: MaintenanceRecord) => {
    setRecords([...records, data]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="h-8 w-8" />
          Vehicle Maintenance
        </h1>
        <MaintenanceForm onSubmit={handleAddRecord} />
      </div>

      <MaintenanceStats records={records} />
      <MaintenanceTable records={records} isLoading={isLoading} />
    </div>
  );
};

export default MaintenancePage;