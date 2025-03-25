import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const DocumentationPage = () => {
  const docs = [
    {
      title: "Getting Started",
      description: "Learn the basics of our platform and how to get started quickly.",
    },
    {
      title: "User Guide",
      description: "Detailed instructions on how to use all features of our platform.",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for integrating with our API.",
    },
    {
      title: "Best Practices",
      description: "Learn about recommended practices and tips for optimal usage.",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Documentation</h1>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-6 md:grid-cols-2">
          {docs.map((doc, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-purple-600">{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Read More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DocumentationPage;