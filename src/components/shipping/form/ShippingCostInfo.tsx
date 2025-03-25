import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ShippingCostInfoProps {
  formData: {
    shippingCost: number;
    insurance: number;
    country: string;
  };
  setFormData: (data: any) => void;
}

export const ShippingCostInfo = ({ formData, setFormData }: ShippingCostInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="shippingCost">Shipping Cost</Label>
        <Input
          id="shippingCost"
          type="number"
          value={formData.shippingCost}
          onChange={(e) => setFormData({ ...formData, shippingCost: parseFloat(e.target.value) || 0 })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="insurance">Insurance</Label>
        <Input
          id="insurance"
          type="number"
          value={formData.insurance}
          onChange={(e) => setFormData({ ...formData, insurance: parseFloat(e.target.value) || 0 })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
      </div>
    </div>
  );
};