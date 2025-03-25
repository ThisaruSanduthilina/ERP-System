import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FileWarning, FileClock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/services/documentService";
import { useToast } from "@/components/ui/use-toast";
import { differenceInDays } from "date-fns";

export const DocumentStats = () => {
  const { toast } = useToast();
  const { data: documents } = useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(0, 100),
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch document statistics",
          variant: "destructive",
        });
      },
    },
  });

  const calculateStats = () => {
    if (!documents) return { active: 0, expiringSoon: 0, expired: 0 };

    const currentDate = new Date();
    let active = 0;
    let expiringSoon = 0;
    let expired = 0;

    documents.forEach(doc => {
      const uploadDate = new Date(doc.uploaded_at);
      const daysDifference = differenceInDays(currentDate, uploadDate);

      // Assuming documents are:
      // - Active: Less than 30 days old
      // - Expiring Soon: Between 30-45 days old
      // - Expired: More than 45 days old
      if (daysDifference < 30) {
        active++;
      } else if (daysDifference >= 30 && daysDifference < 45) {
        expiringSoon++;
      } else {
        expired++;
      }
    });

    return { active, expiringSoon, expired };
  };

  const stats = calculateStats();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
          <FileCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.active}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <FileWarning className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.expiringSoon}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expired Documents</CardTitle>
          <FileClock className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.expired}</div>
        </CardContent>
      </Card>
    </div>
  );
};