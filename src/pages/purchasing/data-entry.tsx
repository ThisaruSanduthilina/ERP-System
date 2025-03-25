import { DataEntryForm } from "@/components/purchasing/DataEntryForm";

export default function DataEntryPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Data Entry</h1>
      <DataEntryForm />
    </div>
  );
}