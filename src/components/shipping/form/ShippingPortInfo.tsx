import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ShippingPortInfoProps {
  formData: {
    pol: string;
    pod: string;
    etd: string;
    eta: string;
  };
  setFormData: (data: any) => void;
}

export const ShippingPortInfo = ({ formData, setFormData }: ShippingPortInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pol">Port of Loading (POL)</Label>
        <Input
          id="pol"
          value={formData.pol}
          onChange={(e) => setFormData({ ...formData, pol: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pod">Port of Destination (POD)</Label>
        <Input
          id="pod"
          value={formData.pod}
          onChange={(e) => setFormData({ ...formData, pod: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="etd">Estimated Time of Departure (ETD)</Label>
        <Input
          id="etd"
          type="date"
          value={formData.etd}
          onChange={(e) => setFormData({ ...formData, etd: e.target.value })}
          required
          placeholder="dd-mm-yyyy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eta">Estimated Time of Arrival (ETA)</Label>
        <Input
          id="eta"
          type="date"
          value={formData.eta}
          onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
          required
          placeholder="dd-mm-yyyy"
        />
      </div>
    </div>
  );
};