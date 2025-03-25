import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { getEnquiries } from "@/services/enquiryService";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Enquiry {
  id: number;
  customer_id: number;
  details: string;
  date: string;
  status: string;
}

export const EnquiriesList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [skip, setSkip] = useState(0);
  const limit = 10; // Adjust the number of items per page

  const { data: enquiries, isLoading, error, isFetching } = useQuery({
    queryKey: ['enquiries', skip, limit],
    queryFn: () => getEnquiries({ skip, limit }),
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        if (error.message.includes('No authentication token found')) {
          navigate('/');
          toast({
            title: t("auth.required"),
            description: t("auth.loginRequired"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("common.error"),
            description: t("enquiries.fetchError"),
            variant: "destructive",
          });
        }
      },
    },
    // keepPreviousData: true, // Ensures smooth pagination
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t("enquiries.fetchError")}
        </AlertDescription>
      </Alert>
    );
  }

  if (!enquiries?.length) {
    return (
      <Alert>
        <AlertDescription>{t("enquiries.noEnquiries")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {enquiries.map((enquiry: Enquiry) => (
        <Card key={enquiry.id} className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{t("enquiries.number", { id: enquiry.id })}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(enquiry.date).toLocaleString()}
              </p>
            </div>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
              {enquiry.status}
            </span>
          </div>
          <p className="text-sm">{enquiry.details}</p>
        </Card>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
          disabled={skip === 0 || isFetching}
        >
          {t("common.previous")}
        </Button>
        <Button
          onClick={() => setSkip((prev) => prev + limit)}
          disabled={enquiries.length < limit || isFetching}
        >
          {t("common.next")}
        </Button>
      </div>
    </div>
  );
};
