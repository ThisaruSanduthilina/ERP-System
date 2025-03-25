import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export const CustomerSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customer Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>harsha subasinghe</TableCell>
              <TableCell>2024-03-15</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  Active
                </span>
              </TableCell>
              <TableCell>Follow-up call</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ramanayake</TableCell>
              <TableCell>2024-03-14</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                  Pending
                </span>
              </TableCell>
              <TableCell>Document review</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rama</TableCell>
              <TableCell>2024-03-13</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  New Lead
                </span>
              </TableCell>
              <TableCell>Initial contact</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};