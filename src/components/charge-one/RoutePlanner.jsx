
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Map, Loader, Route, LocateFixed } from 'lucide-react';

export default function RoutePlanner({ onPlanRoute, originRef, destinationRef, loading, onUseMyLocation }) {
  
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
          <div className="flex gap-2">
            <Input 
                id="origin" 
                placeholder="Current Location" 
                ref={originRef}
                disabled={loading}
            />
            <Button variant="outline" size="icon" onClick={onUseMyLocation} disabled={loading} aria-label="Use my location">
                <LocateFixed />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input 
            id="destination" 
            placeholder="e.g., Agra" 
            ref={destinationRef}
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onPlanRoute} disabled={loading}>
            {loading ? <Loader className="mr-2 animate-spin" /> : <Map className="mr-2" />}
            {loading ? 'Calculating...' : 'Calculate Route'}
        </Button>
      </CardFooter>
    </Card>
  );
}
