import { useQuery } from "@tanstack/react-query";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchInvoices } from "@/services/invoiceService";
import { formatDate } from "@/lib/utils";

export const InvoiceList = () => {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices?.map((invoice) => (
        <div
          key={invoice.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-medium">{invoice.name}</h3>
              <div className="text-sm text-gray-500 space-x-2">
                <span>Invoice #{invoice.id}</span>
                <span>•</span>
                <span>{formatDate(invoice.date)}</span>
                <span>•</span>
                <span>${invoice.amount.toLocaleString()}</span>
                <span>•</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {invoices?.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No invoices found
        </div>
      )}
    </div>
  );
};