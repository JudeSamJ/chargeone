<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
=======

"use client";

import { useState, useEffect } from 'react';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
<<<<<<< HEAD
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

const ALL_CONNECTOR_TYPES = ["CCS", "CHAdeMO", "Type 2"];

export default function FilterDialog({
  isOpen,
  onOpenChange,
  activeFilters,
  onFiltersChange,
  userVehicleConnector,
}) {
=======
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';

const ALL_CONNECTOR_TYPES = ['CCS', 'CHAdeMO', 'Type 2'];

export default function FilterDialog({ isOpen, onOpenChange, activeFilters, onFiltersChange, userVehicleConnector }) {
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  useEffect(() => {
    // Sync local state if the prop changes from outside
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const handleCheckedChange = (connector, isChecked) => {
<<<<<<< HEAD
    setSelectedFilters((prev) => {
      if (isChecked) {
        return [...prev, connector];
      } else {
        return prev.filter((c) => c !== connector);
=======
    setSelectedFilters(prev => {
      if (isChecked) {
        return [...prev, connector];
      } else {
        return prev.filter(c => c !== connector);
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      }
    });
  };

  const handleApply = () => {
    onFiltersChange(selectedFilters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedFilters([userVehicleConnector]);
<<<<<<< HEAD
  };
=======
  }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Stations</DialogTitle>
          <DialogDescription>
            Show stations with the selected connector types.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
<<<<<<< HEAD
          <p className="text-sm font-medium">Connector Types</p>
          <div className="space-y-3">
            {ALL_CONNECTOR_TYPES.map((connector) => (
              <div key={connector} className="flex items-center space-x-3">
                <Checkbox
                  id={`filter-${connector}`}
                  checked={selectedFilters.includes(connector)}
                  onCheckedChange={(isChecked) =>
                    handleCheckedChange(connector, isChecked)
                  }
                />
                <Label
                  htmlFor={`filter-${connector}`}
                  className="font-normal flex items-center gap-2"
                >
                  {connector}
                  {connector === userVehicleConnector && (
                    <Badge variant="outline">Your Vehicle</Badge>
                  )}
                </Label>
              </div>
            ))}
          </div>
          <Separator />
          <Button
            variant="link"
            className="p-0 h-auto justify-start"
            onClick={handleReset}
          >
            Reset to my vehicle's connector
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
=======
            <p className="text-sm font-medium">Connector Types</p>
            <div className="space-y-3">
            {ALL_CONNECTOR_TYPES.map(connector => (
                <div key={connector} className="flex items-center space-x-3">
                <Checkbox
                    id={`filter-${connector}`}
                    checked={selectedFilters.includes(connector)}
                    onCheckedChange={(isChecked) => handleCheckedChange(connector, isChecked)}
                />
                <Label htmlFor={`filter-${connector}`} className="font-normal flex items-center gap-2">
                    {connector}
                    {connector === userVehicleConnector && <Badge variant="outline">Your Vehicle</Badge>}
                </Label>
                </div>
            ))}
            </div>
            <Separator />
             <Button variant="link" className="p-0 h-auto justify-start" onClick={handleReset}>
                Reset to my vehicle's connector
             </Button>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleApply}>
                Apply Filters
            </Button>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
