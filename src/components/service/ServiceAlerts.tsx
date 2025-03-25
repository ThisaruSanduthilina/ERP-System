import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, Wrench } from "lucide-react";

export const ServiceAlerts = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h3 className="font-medium">Maintenance Due</h3>
            <p className="text-sm text-muted-foreground">Vehicle #1234 is due for scheduled maintenance</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <Clock className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h3 className="font-medium">Upcoming Service</h3>
            <p className="text-sm text-muted-foreground">Brake inspection scheduled for next week</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <Wrench className="h-5 w-5 text-blue-500 mt-1" />
          <div>
            <h3 className="font-medium">Part Replacement</h3>
            <p className="text-sm text-muted-foreground">Air filter replacement recommended</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};