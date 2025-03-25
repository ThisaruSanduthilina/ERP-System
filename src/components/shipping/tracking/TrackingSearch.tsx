import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrackingSearchProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  handleTrackingSearch: (e: React.FormEvent) => void;
}

export const TrackingSearch = ({
  trackingNumber,
  setTrackingNumber,
  handleTrackingSearch,
}: TrackingSearchProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Search className="h-5 w-5" />
          Track Your Shipment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrackingSearch} className="flex gap-4">
          <Input
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Track
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};