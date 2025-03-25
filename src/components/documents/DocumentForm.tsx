import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, X, Upload } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createDocument } from "@/services/documentService";
import { useQueryClient } from "@tanstack/react-query";

const documentFormSchema = z.object({
  customer_id: z.number().min(1, "Customer ID is required"),
  file: z.any().refine((file) => file instanceof File, "File is required"),
});

type DocumentFormValues = z.infer<typeof documentFormSchema>;

export const DocumentForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      customer_id: 0,
    },
  });

  const onSubmit = async (data: DocumentFormValues) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);
      
      // In a real application, you would upload the file to a storage service
      // and get back a URL. For now, we'll create a fake URL
      const fakeFileUrl = URL.createObjectURL(data.file);
      
      await createDocument({
        customer_id: data.customer_id,
        file_name: data.file.name,
        file_path: fakeFileUrl,
        uploaded_at: new Date().toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['documents'] });
      
      toast({
        title: "Success",
        description: "Document has been uploaded successfully",
      });
      
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload Document
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload New Document</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
              <FormField
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter customer ID"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Document File</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          className="cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};