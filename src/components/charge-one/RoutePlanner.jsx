
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Map, Route } from 'lucide-react';

export default function RoutePlanner({ onPlanRoute, originRef, destinationRef }) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-6 w-6" />
          Route Planner
        </CardTitle>
        <CardDescription>
          Plan a trip and find charging stations along the way.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <Input 
              id="origin" 
              placeholder="e.g., Delhi" 
              ref={originRef}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input 
            id="destination" 
            placeholder="e.g., Agra" 
            ref={destinationRef}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onPlanRoute}>
            <Map className="mr-2" />
            Calculate Route
        </Button>
      </CardFooter>
    </Card>
  );
}
