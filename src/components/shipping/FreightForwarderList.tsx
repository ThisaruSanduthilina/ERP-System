import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFreightForwarders, deleteFreightForwarder } from "@/services/freightForwarderService";
import { FreightForwarder } from "@/types/shipping";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FreightForwarderForm } from "./FreightForwarderForm";

export const FreightForwarderList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: forwarders, isLoading, error } = useQuery({
    queryKey: ['freight-forwarders'],
    queryFn: () => getFreightForwarders(),
    meta: {
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFreightForwarder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freight-forwarders'] });
      toast({
        title: "Success",
        description: "Freight forwarder deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load freight forwarders
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-900">Freight Forwarders</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Freight Forwarder
        </Button>
      </div>

      {showAddForm && (
        <FreightForwarderForm onClose={() => setShowAddForm(false)} />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forwarders?.map((forwarder: FreightForwarder) => (
              <TableRow key={forwarder.id}>
                <TableCell>{forwarder.name}</TableCell>
                <TableCell>{forwarder.contact}</TableCell>
                <TableCell>{forwarder.country}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(forwarder.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!forwarders || forwarders.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No freight forwarders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};