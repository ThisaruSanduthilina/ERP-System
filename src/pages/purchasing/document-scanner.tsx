import { DocumentScanner } from "@/components/purchasing/DocumentScanner";

export default function DocumentScannerPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Document Scanner</h1>
      <DocumentScanner />
    </div>
  );
}