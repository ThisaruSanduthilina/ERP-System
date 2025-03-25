import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Clock, AlertCircle } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ServiceSection = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Active Service Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#SRV001</TableCell>
                  <TableCell>Oil Change</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                      In Progress
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#SRV002</TableCell>
                  <TableCell>Brake Service</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      Completed
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">James Wilson</p>
                <p className="text-sm text-gray-500">Routine Maintenance</p>
              </div>
              <p className="text-sm mt-2 md:mt-0">Today, 2:30 PM</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Sarah Parker</p>
                <p className="text-sm text-gray-500">Tire Rotation</p>
              </div>
              <p className="text-sm mt-2 md:mt-0">Tomorrow, 10:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Service Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              <p className="font-medium">Low Parts Inventory</p>
              <p className="text-sm">Brake pads running low</p>
            </div>
            <div className="p-3 bg-yellow-50 text-yellow-700 rounded-lg">
              <p className="font-medium">Technician Schedule</p>
              <p className="text-sm">High workload for next week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};