// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { createEnquiry } from "@/services/enquiryService";
// import { useTranslation } from "react-i18next";
// import { useQueryClient } from "@tanstack/react-query";

// export const EnquiryForm = () => {
//   const { toast } = useToast();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const [details, setDetails] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await createEnquiry({
//         customer_id: 1, // This should come from your auth context or user state
//         details,
//         date: new Date().toISOString(),
//         status: "New"
//       });

//       toast({
//         title: t("enquiries.success"),
//         description: t("enquiries.successMessage"),
//       });

//       setDetails("");
//       // Invalidate and refetch enquiries
//       queryClient.invalidateQueries({ queryKey: ['enquiries'] });
//     } catch (error) {
//       toast({
//         title: t("enquiries.error"),
//         description: t("enquiries.errorMessage"),
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{t("enquiries.newEnquiry")}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Textarea
//               value={details}
//               onChange={(e) => setDetails(e.target.value)}
//               placeholder={t("enquiries.detailsPlaceholder")}
//               className="min-h-[100px]"
//               required
//             />
//           </div>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? t("common.submitting") : t("common.submit")}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };



import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createEnquiry } from "@/services/enquiryService";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

export const EnquiryForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [details, setDetails] = useState("");
  const [customerId, setCustomerId] = useState(0); // Assuming customer ID is required
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare enquiry data
      const enquiryData = {
        customer_id: customerId, // Update this as per your user management system
        details,
        date: new Date().toISOString(),
        status: "New",
      };

      // Call API to create enquiry
      await createEnquiry(enquiryData);

      toast({
        title: t("enquiries.success"),
        description: t("enquiries.successMessage"),
      });

      // Clear the form
      setDetails("");
      setCustomerId(0);

      // Invalidate and refetch enquiries
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    } catch (error) {
      toast({
        title: t("enquiries.error"),
        description: t("enquiries.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("enquiries.newEnquiry")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
              {t("enquiries.customerId")}
            </label>
            <input
              type="number"
              id="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(Number(e.target.value))}
              placeholder={t("enquiries.customerIdPlaceholder")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              {t("enquiries.details")}
            </label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t("enquiries.detailsPlaceholder")}
              className="min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("common.submitting") : t("common.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
