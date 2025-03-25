import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/services/documentService";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const DocumentTable = () => {
  const { toast } = useToast();
  const { data: documents, isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(0, 100),
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch documents. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading documents...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading documents</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents && documents.length > 0 ? (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {doc.file_name}
                </TableCell>
                <TableCell>{doc.customer_id}</TableCell>
                <TableCell>
                  {format(new Date(doc.uploaded_at), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(doc.file_path, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};