import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ShippingPartyInfoProps {
  formData: {
    consignor: string;
    consignee: string;
    notify: string;
  };
  setFormData: (data: any) => void;
}

export const ShippingPartyInfo = ({ formData, setFormData }: ShippingPartyInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="consignor">Consignor</Label>
        <Input
          id="consignor"
          value={formData.consignor}
          onChange={(e) => setFormData({ ...formData, consignor: e.target.value })}
          placeholder="Enter consignor"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="consignee">Consignee</Label>
        <Input
          id="consignee"
          value={formData.consignee}
          onChange={(e) => setFormData({ ...formData, consignee: e.target.value })}
          placeholder="Enter consignee"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notify">Notify Party</Label>
        <Input
          id="notify"
          value={formData.notify}
          onChange={(e) => setFormData({ ...formData, notify: e.target.value })}
          placeholder="Enter notify party"
        />
      </div>
    </div>
  );
};