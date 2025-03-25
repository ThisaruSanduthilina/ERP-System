import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAppointment, getAppointments } from "@/services/appointmentService";
import { getServices } from "@/services/serviceService";
import { AppointmentForm } from "./AppointmentForm";
import { AppointmentsTable } from "./AppointmentsTable";

export const ServiceAppointments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 100;

  // Fetch services
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  // Fetch appointments with pagination
  const { data: appointments = [], isLoading: isLoadingAppointments } = useQuery({
    queryKey: ['appointments', page, limit],
    queryFn: async () => {
      try {
        const skip = page * limit;
        const data = await getAppointments(skip, limit);
        console.log('Appointments fetched:', data);
        return data;
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch appointments. Please try again later.",
        });
        return [];
      }
    },
  });

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Appointment created successfully",
      });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Service Appointments</h2>
        <Button className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Appointment
        </Button>
      </div>

      <AppointmentsTable 
        appointments={appointments} 
        services={services}
        isLoading={isLoadingAppointments}
      />

      <AppointmentForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        services={services}
        createAppointmentMutation={createAppointmentMutation}
      />
    </div>
  );
};