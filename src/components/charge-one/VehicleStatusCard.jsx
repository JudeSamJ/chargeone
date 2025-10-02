import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Car,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Plug,
  Gauge,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "../ui/separator";

export default function VehicleStatusCard({ vehicle }) {
  const {
    make,
    model,
    batteryCapacity,
    currentCharge,
    connectorType,
    consumption,
  } = vehicle;

  const getBatteryInfo = (charge) => {
    if (charge > 75) {
      return { Icon: BatteryFull, color: "text-chart-2" };
    }
    if (charge > 25) {
      return { Icon: BatteryMedium, color: "text-chart-4" };
    }
    if (charge > 10) {
      return { Icon: BatteryLow, color: "text-destructive" };
    }
    return { Icon: BatteryWarning, color: "text-destructive animate-pulse" };
  };

  const { Icon, color } = getBatteryInfo(currentCharge);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Your Vehicle</CardTitle>
        <Car className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold font-headline">
          {make} {model}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Icon className={`h-8 w-8 ${color}`} />
          <div className="w-full">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-bold">{currentCharge}%</span>
              <p className="text-xs text-muted-foreground">
                {((batteryCapacity * currentCharge) / 100).toFixed(1)} kWh
                available
              </p>
            </div>
            <Progress value={currentCharge} className="mt-1" />
          </div>
        </div>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex-col items-start pt-4">
        <p className="text-sm font-medium mb-2">Vehicle Details</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm w-full">
          <div className="flex items-center gap-2">
            <Plug className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Connector</p>
              <p className="font-semibold">{connectorType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BatteryFull className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Battery</p>
              <p className="font-semibold">{batteryCapacity} kWh</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Consumption</p>
              <p className="font-semibold">{consumption} km/kWh</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
