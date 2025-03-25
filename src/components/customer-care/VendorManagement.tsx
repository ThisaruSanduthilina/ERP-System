import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VendorManagement = () => {
  const navigate = useNavigate();
  const vendors = [
    { 
      id: 1, 
      name: "Auto Parts Plus", 
      rating: 4.5, 
      status: "active", 
      lastOrder: "2024-02-15",
      totalOrders: 150
    },
    { 
      id: 2, 
      name: "Global Supplies Co", 
      rating: 4.0, 
      status: "active", 
      lastOrder: "2024-02-10",
      totalOrders: 89
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Vendor Management</h3>
        <Button 
          variant="outline"
          onClick={() => navigate("/customer-care/add-vendor")}
        >
          Add Vendor
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{vendor.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={vendor.status === 'active' ? 'success' : 'secondary'}>
                  {vendor.status}
                </Badge>
              </TableCell>
              <TableCell>{vendor.lastOrder}</TableCell>
              <TableCell>{vendor.totalOrders}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};