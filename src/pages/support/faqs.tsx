import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const FAQsPage = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive suite of automotive management solutions including vehicle inventory management, maintenance tracking, sales analytics, and customer relationship management.",
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply sign up for an account, and our onboarding team will guide you through the setup process. We'll help you configure your dashboard and import your existing data.",
    },
    {
      question: "Is technical support included?",
      answer: "Yes, all our plans include technical support. You can reach our support team via email, phone, or live chat during business hours.",
    },
    {
      question: "Can I integrate with other systems?",
      answer: "Yes, our platform offers various integration options with popular automotive and business management tools. Contact our support team for specific integration requirements.",
    },
    {
      question: "What about data security?",
      answer: "We take data security seriously. Our platform uses industry-standard encryption and security measures to protect your data. We are fully compliant with relevant data protection regulations.",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Frequently Asked Questions
      </h1>
      
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-purple-600">
              Common Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-purple-600 hover:text-purple-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default FAQsPage;