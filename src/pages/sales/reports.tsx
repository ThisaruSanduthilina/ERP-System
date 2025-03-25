import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";
import { getInventoryItems } from "@/services/inventoryService";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const ReportsPage = () => {
  const { toast } = useToast();
  
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const generateMonthlySalesSummary = () => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      toast({
        title: "No data available",
        description: "There are no sales records to generate a report.",
        variant: "destructive",
      });
      return;
    }

    // Group orders by month
    const monthlyOrders = orders.reduce((acc: any, order) => {
      const monthYear = format(new Date(order.date), 'MMMM yyyy');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);
      return acc;
    }, {});

    // Generate report content
    let reportContent = "Monthly Sales Summary Report\n\n";
    
    Object.entries(monthlyOrders).forEach(([monthYear, monthOrders]: [string, any[]]) => {
      const totalSales = monthOrders.reduce((sum, order) => sum + order.total, 0);
      const completedOrders = monthOrders.filter(order => order.status === "Completed").length;
      const pendingOrders = monthOrders.filter(order => order.status === "Pending").length;
      
      reportContent += `\n${monthYear}\n`;
      reportContent += "------------------------\n";
      reportContent += `Total Orders: ${monthOrders.length}\n`;
      reportContent += `Completed Orders: ${completedOrders}\n`;
      reportContent += `Pending Orders: ${pendingOrders}\n`;
      reportContent += `Total Sales: $${totalSales.toLocaleString()}\n`;
      reportContent += "\nOrder Details:\n";
      
      monthOrders.forEach(order => {
        reportContent += `\nOrder ID: ${order.id}\n`;
        reportContent += `Date: ${format(new Date(order.date), 'PP')}\n`;
        reportContent += `Status: ${order.status}\n`;
        reportContent += `Total Amount: $${order.total.toLocaleString()}\n`;
        reportContent += "Items:\n";
        order.items?.forEach((item: any) => {
          reportContent += `  - ${item.item_name}: ${item.quantity} x $${item.price} = $${item.total}\n`;
        });
        reportContent += "------------------------\n";
      });
    });

    downloadReport(reportContent, `sales_summary_${format(new Date(), 'MMM_yyyy')}.txt`);
  };

  const generateInventoryReport = () => {
    if (!inventory || !Array.isArray(inventory) || inventory.length === 0) {
      toast({
        title: "No data available",
        description: "There are no inventory items to generate a report.",
        variant: "destructive",
      });
      return;
    }

    let reportContent = "Inventory Summary Report\n";
    reportContent += `Generated on: ${format(new Date(), 'PP pp')}\n\n`;
    reportContent += "Total Items in Inventory: " + inventory.length + "\n\n";
    reportContent += "Detailed Inventory List:\n";
    reportContent += "------------------------\n\n";

    inventory.forEach((item) => {
      reportContent += `Stock No: ${item.stock_no || 'N/A'}\n`;
      reportContent += `Product Name: ${item.product_name}\n`;
      reportContent += `Category: ${item.category}\n`;
      reportContent += `Make: ${item.make}\n`;
      reportContent += `Model: ${item.model}\n`;
      reportContent += `Year: ${item.registration_year}\n`;
      reportContent += `Price: $${item.price?.toLocaleString() || 'N/A'}\n`;
      reportContent += `Location: ${item.location || 'N/A'}\n`;
      reportContent += `Chassis Number: ${item.chassis_number || 'N/A'}\n`;
      reportContent += `Engine Number: ${item.engine_number || 'N/A'}\n`;
      reportContent += `Mileage: ${item.mileage?.toLocaleString() || 'N/A'} km\n`;
      reportContent += `Fuel Type: ${item.fuel_type || 'N/A'}\n`;
      reportContent += `Transmission: ${item.transmission || 'N/A'}\n`;
      reportContent += `Drive: ${item.drive || 'N/A'}\n`;
      reportContent += `Color: ${item.colour || 'N/A'}\n`;
      reportContent += `Dimensions: ${item.dimensions || 'N/A'}\n`;
      reportContent += `Status: ${item.quantity > 0 ? 'In Stock' : 'Out of Stock'}\n`;
      reportContent += "------------------------\n\n";
    });

    downloadReport(reportContent, `inventory_report_${format(new Date(), 'MMM_yyyy')}.txt`);
  };

  const downloadReport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: `${filename} has been downloaded successfully.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Sales Reports</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Monthly Sales Summary", 
                  date: format(new Date(), 'MMMM yyyy'),
                  description: "Detailed monthly sales report including order statistics and item details",
                  action: generateMonthlySalesSummary
                },
                { 
                  title: "Inventory Report", 
                  date: format(new Date(), 'MMMM yyyy'),
                  description: "Complete inventory list with detailed vehicle specifications",
                  action: generateInventoryReport
                },
                { 
                  title: "Quarterly Performance Report", 
                  date: `Q${Math.floor((new Date().getMonth() + 3) / 3)} ${new Date().getFullYear()}`,
                  description: "Quarterly sales analysis and performance metrics",
                  size: "Coming soon" 
                },
                { 
                  title: "Vehicle Sales Distribution", 
                  date: format(new Date(), 'MMMM yyyy'),
                  description: "Analysis of vehicle sales by make, model, and category",
                  size: "Coming soon" 
                }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">Generated: {report.date}</p>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {report.size || "Available for download"}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={report.action}
                      disabled={!report.action}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;