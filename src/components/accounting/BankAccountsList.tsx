import { useQuery } from "@tanstack/react-query";
import { getBanks } from "@/services/bankService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export function BankAccountsList() {
  const { toast } = useToast();
  const { data: banks, isLoading, error } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
  });

  if (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch bank accounts",
      variant: "destructive",
    });
  }

  if (isLoading) {
    return <div>Loading bank accounts...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bank Name</TableHead>
          <TableHead>Account Name</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banks?.map((bank) => (
          <TableRow key={bank.id}>
            <TableCell className="font-medium">{bank.bank_name}</TableCell>
            <TableCell>{bank.account_name}</TableCell>
            <TableCell>{bank.account_number}</TableCell>
            <TableCell>{bank.branch}</TableCell>
            <TableCell className="text-right">
              ${bank.balance.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}