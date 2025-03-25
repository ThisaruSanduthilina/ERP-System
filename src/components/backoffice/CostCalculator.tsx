import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CostCalculator = () => {
  const [costs, setCosts] = useState({
    vehiclePrice: 0,
    auctionCharges: 0,
    transportFees: 0,
    customCharges: 0,
    otherFees: 0
  });

  const totalCost = Object.values(costs).reduce((acc, curr) => acc + curr, 0);

  const handleCostChange = (field: keyof typeof costs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCosts(prev => ({
      ...prev,
      [field]: parseFloat(e.target.value) || 0
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                <Input
                  id="vehiclePrice"
                  type="number"
                  placeholder="0.00"
                  onChange={handleCostChange('vehiclePrice')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auctionCharges">Auction Charges</Label>
                <Input
                  id="auctionCharges"
                  type="number"
                  placeholder="0.00"
                  onChange={handleCostChange('auctionCharges')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transportFees">Transport Fees</Label>
                <Input
                  id="transportFees"
                  type="number"
                  placeholder="0.00"
                  onChange={handleCostChange('transportFees')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customCharges">Custom Charges</Label>
                <Input
                  id="customCharges"
                  type="number"
                  placeholder="0.00"
                  onChange={handleCostChange('customCharges')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherFees">Other Fees</Label>
              <Input
                id="otherFees"
                type="number"
                placeholder="0.00"
                onChange={handleCostChange('otherFees')}
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Cost:</span>
                <span className="text-lg font-bold text-purple-600">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Save Calculation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};