import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Instagram, Send, List } from "lucide-react";
import { EnquiryForm } from "@/components/enquiries/EnquiryForm";
import { EnquiriesList } from "@/components/enquiries/EnquiriesList";
import { QueryClient } from "@tanstack/react-query";
import { getEnquiries } from "@/services/enquiryService";

// Pre-fetch enquiries data
const queryClient = new QueryClient();
queryClient.prefetchQuery({
  queryKey: ['enquiries'],
  queryFn: () => getEnquiries(),
});

export default function MessagesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="enquiry" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            New Enquiry
          </TabsTrigger>
          <TabsTrigger value="show-enquiries" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Show Enquiries
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>WhatsApp integration and messages will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="instagram">
            <Card>
              <CardHeader>
                <CardTitle>Instagram Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Instagram direct messages and interactions will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="enquiry">
            <EnquiryForm />
          </TabsContent>
          <TabsContent value="show-enquiries">
            <Card>
              <CardHeader>
                <CardTitle>All Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <EnquiriesList />
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}