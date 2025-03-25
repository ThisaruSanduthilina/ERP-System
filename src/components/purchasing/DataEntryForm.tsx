import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

export const DataEntryForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data submitted",
      description: "Your auction data has been successfully saved.",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Auction Data Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input type="date" id="purchaseDate" />
          </div>
          <div>
            <Label htmlFor="stockNumber">Stock Number</Label>
            <Input type="text" id="stockNumber" placeholder="Enter stock number" />
          </div>
          <div>
            <Label htmlFor="auctionSheet">Auction Sheet</Label>
            <div className="flex items-center gap-4">
              <Input type="file" id="auctionSheet" className="cursor-pointer" accept="image/*,application/pdf" />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Button type="submit">Submit Data</Button>
      </form>
    </div>
  );
};