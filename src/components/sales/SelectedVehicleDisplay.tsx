import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react";

interface SelectedVehicleDisplayProps {
  vehicle: any;
  onChangeVehicle: () => void;
}

export const SelectedVehicleDisplay = ({
  vehicle,
  onChangeVehicle,
}: SelectedVehicleDisplayProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h4 className="font-medium">{vehicle.make} {vehicle.model}</h4>
          <div className="relative">
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-32 h-24 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.fallback');
                  if (fallback) {
                    fallback.classList.remove('hidden');
                  }
                }}
              />
            ) : null}
            <div className={`fallback w-32 h-24 bg-gray-100 rounded-md flex items-center justify-center ${vehicle.image_url ? 'hidden' : ''}`}>
              <ImageOff className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onChangeVehicle}
          >
            Change Vehicle
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Stock No: {vehicle.stockNo}</div>
        <div>Year: {vehicle.year}</div>
        <div>Color: {vehicle.color}</div>
        <div>VIN: {vehicle.vin}</div>
        <div className="col-span-2 font-semibold text-purple-700">
          Price: ${vehicle.price?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};