import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Account {
  id: string;
  account_name: string;
  account_type: string;
  description: string;
}

interface AccountsListProps {
  accounts: Account[];
}

export function AccountsList({ accounts }: AccountsListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.account_name}</TableCell>
            <TableCell className="capitalize">{account.account_type}</TableCell>
            <TableCell>{account.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}