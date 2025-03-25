import { DocumentForm } from "@/components/documents/DocumentForm";
import { DocumentTable } from "@/components/documents/DocumentTable";
import { DocumentStats } from "@/components/documents/DocumentStats";

const DocumentsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vehicle Documents</h1>
      </div>
      
      <DocumentStats />
      <DocumentTable />
      <DocumentForm />
    </div>
  );
};

export default DocumentsPage;