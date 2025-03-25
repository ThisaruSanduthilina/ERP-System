import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFollowUps } from "@/services/followUpService";
import { format } from "date-fns";
import { useState } from "react";
import { EditFollowUpDialog } from "./EditFollowUpDialog";

interface FollowUpsTableProps {
  selectedType: string | null;
}

export const FollowUpsTable = ({ selectedType }: FollowUpsTableProps) => {
  const [selectedFollowUp, setSelectedFollowUp] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: followUps, isLoading, error } = useQuery({
    queryKey: ['followUps'],
    queryFn: getFollowUps
  });

  const handleEdit = (followUp: any) => {
    setSelectedFollowUp(followUp);
    setEditDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading follow-ups</div>;
  }

  // Filter follow-ups by type if selected
  const filteredFollowUps = selectedType
    ? followUps?.filter((followUp: any) => followUp.type === selectedType)
    : followUps;

  // Group follow-ups by status
  const groupedFollowUps = filteredFollowUps?.reduce((acc: any, followUp: any) => {
    const status = followUp.status || 'Pending';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(followUp);
    return acc;
  }, {});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-8">
        {Object.entries(groupedFollowUps || {}).map(([status, followUpsInStatus]: [string, any]) => (
          <div key={status} className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
                {status}
              </span>
              <span className="text-gray-600">({followUpsInStatus.length})</span>
            </h3>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followUpsInStatus.map((followUp: any) => (
                  <TableRow key={followUp.id}>
                    <TableCell>{followUp.customer}</TableCell>
                    <TableCell>{followUp.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(new Date(followUp.date), 'yyyy-MM-dd')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {followUp.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(followUp)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      <EditFollowUpDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        followUpData={selectedFollowUp}
      />
    </>
  );
};