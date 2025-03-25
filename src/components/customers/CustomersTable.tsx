import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { Customer } from "@/services/customerService"
import { format } from "date-fns"

interface CustomersTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function CustomersTable({ customers, onEdit, onDelete }: CustomersTableProps) {
  if (!customers || customers.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No customers found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>VAT No.</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.mobile_number}</TableCell>
            <TableCell>{customer.city}</TableCell>
            <TableCell>{customer.country}</TableCell>
            <TableCell>{customer.vat_no}</TableCell>
            <TableCell>${customer.balance}</TableCell>
            <TableCell>
              {customer.created_at ? format(new Date(customer.created_at), 'dd/MM/yyyy') : '-'}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(customer)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(customer)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}