import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface AppointmentsTableProps {
  appointments: any[];
  services: any[];
  isLoading: boolean;
}

export const AppointmentsTable = ({ appointments, services, isLoading }: AppointmentsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments?.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(appointment.date), 'PPpp')}
              </div>
            </TableCell>
            <TableCell>{appointment.customer_id}</TableCell>
            <TableCell>
              {services.find(s => s.id === appointment.service_id)?.service_name || 'Unknown Service'}
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-sm ${
                appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {appointment.status}
              </span>
            </TableCell>
            <TableCell>{appointment.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};