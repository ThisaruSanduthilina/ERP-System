import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createFollowUp, updateFollowUp } from "@/services/followUpService";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface FollowUpFormProps {
  onSuccess: () => void;
  leadId?: number;
  initialData?: any;
  isEditing?: boolean;
}

export const FollowUpForm = ({ onSuccess, leadId, initialData, isEditing = false }: FollowUpFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      customerName: "",
      type: "",
      date: new Date(),
      time: "",
    }
  });

  useEffect(() => {
    if (initialData && isEditing) {
      form.reset({
        customerName: initialData.customer,
        type: initialData.type,
        date: new Date(initialData.date),
        time: initialData.time,
      });
    }
  }, [initialData, isEditing, form]);

  const onSubmit = async (data: any) => {
    try {
      const followUpData = {
        customer: data.customerName,
        type: data.type,
        date: data.date.toISOString(),
        time: data.time,
        status: "Scheduled",
        lead_id: leadId || 1, // Default to 1 if no lead_id provided
        user_id: user?.id || 1 // Default to 1 if no user_id available
      };

      if (isEditing && initialData) {
        await updateFollowUp(initialData.id, followUpData);
        toast.success("Follow-up updated successfully!");
      } else {
        await createFollowUp(followUpData);
        toast.success("Follow-up scheduled successfully!");
      }
      
      queryClient.invalidateQueries({ queryKey: ['followUps'] });
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to handle follow-up:', error);
      toast.error(isEditing ? "Failed to update follow-up" : "Failed to schedule follow-up");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select follow-up type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {isEditing ? "Update Follow-up" : "Schedule Follow-up"}
        </Button>
      </form>
    </Form>
  );
};