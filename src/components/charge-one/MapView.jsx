
"use client";

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, DirectionsRenderer } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { findStations } from '@/ai/flows/findStations';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { mapStylesLight } from '@/lib/map-styles-light';
import { mapStylesDark } from '@/lib/map-styles-dark';
import { Badge } from '../ui/badge';
import { Zap, Plug, CircleDotDashed, CalendarCheck } from 'lucide-react';

const mapContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
};

export default function MapView({ 
    onStationsFound, 
    stations, 
    onStationClick, 
    directionsResponse,
    onLocationUpdate, 
    currentLocation, 
    mapTypeId,
    showTraffic,
    bookedStationIds,
    setRecenterCallback
}) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBMltP754BsiINUjJ90C0HE5YE0As2cTcc",
        libraries: ['places', 'geometry'], 
    });
    
    const [activeMarker, setActiveMarker] = useState(null);
    const { toast } = useToast();
    const mapRef = useRef(null);
    const { theme } = useTheme();
    const [locationReady, setLocationReady] = useState(false);
    const initialLocationSetRef = useRef(false);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setRecenterCallback(() => () => {
            if (mapRef.current) {
                mapRef.current.panTo(currentLocation || defaultCenter);
                mapRef.current.setZoom(12);
            }
        });
    }, [currentLocation, setRecenterCallback]);

    const fetchStations = useCallback((lat, lng, radius) => {
        findStations({ latitude: lat, longitude: lng, radius })
            .then(onStationsFound)
            .catch(err => {
                console.error("Error finding stations:", err);
                toast({ variant: 'destructive', title: 'Could not find nearby stations.'});
            });
    }, [onStationsFound, toast]);

    useEffect(() => {
        if (!isLoaded) return;
    
        const handleLocationError = (error) => {
            console.error("Geolocation error:", error.message);
            toast({ title: "Could not get your location. Showing default." });
            if (!locationReady) {
                onLocationUpdate(defaultCenter); // Set default location on error
                setLocationReady(true);
                fetchStations(defaultCenter.lat, defaultCenter.lng, 10000);
            }
        };
    
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    onLocationUpdate(currentPos);
                    
                    if (!locationReady) {
                        setLocationReady(true);
                    }
    
                    if (!initialLocationSetRef.current && mapRef.current) {
                        mapRef.current.panTo(currentPos);
                        mapRef.current.setZoom(14);
                        fetchStations(currentPos.lat, currentPos.lng, 10000);
                        initialLocationSetRef.current = true;
                    }
                },
                handleLocationError,
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
            );
        };
        
        updatePosition(); // Get initial position
        const intervalId = setInterval(updatePosition, 5000); // Update every 5 seconds
    
        return () => clearInterval(intervalId);
    }, [isLoaded, onLocationUpdate, fetchStations, toast, locationReady]);

    const getStationMarkerIcon = (station) => {
        if (!isLoaded) return null;

        if (bookedStationIds.includes(station.id)) {
            return {
                path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H11v-6h2v4h1.5v2z', // Clock icon path
                fillColor: '#10B981', // Green-500
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 1.5,
                scale: 1.2,
                anchor: new window.google.maps.Point(12, 12),
            };
        }

        let color = '#808080'; // Grey for unavailable
        if (station.status === 'available') {
            color = '#10B981'; // Green
        } else if (station.status === 'in-use') {
            color = '#EF4444'; // Red
        }

        return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 1.5,
            scale: 7,
        };
    };
    
    const mapThemeStyles = theme === 'dark' ? mapStylesDark : mapStylesLight;


    if (loadError) return <div className="flex items-center justify-center h-full w-full bg-muted rounded-lg"><p>Error loading map</p></div>;
    if (!isLoaded || !locationReady) return <div className="flex items-center justify-center h-full w-full bg-muted rounded-lg"><p>Getting your location...</p></div>;
    
    const activeStation = activeMarker && 'name' in activeMarker.content ? activeMarker.content : null;
    const activeTitle = activeMarker && 'title' in activeMarker.content ? activeMarker.content.title : null;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={12}
            onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
            mapTypeId={mapTypeId}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: mapTypeId === 'roadmap' ? mapThemeStyles : undefined,
                minZoom: 3,
            }}
        >
            {isLoaded && (
              <>
                {currentLocation && !directionsResponse && (
                  <MarkerF
                      position={currentLocation}
                      title="Your Location"
                      onMouseOver={() => setActiveMarker({ position: currentLocation, content: { title: 'Your Location' } })}
                      icon={{
                          path: window.google.maps.SymbolPath.CIRCLE,
                          fillColor: '#4285F4',
                          fillOpacity: 1,
                          strokeColor: '#ffffff',
                          strokeWeight: 2,
                          scale: 8,
                      }}
                  />
                )}
                
                {stations.map(station => (
                    <MarkerF
                        key={station.id}
                        position={{ lat: station.lat, lng: station.lng }}
                        title={`${station.name} (${station.power}kW)`}
                        onClick={() => onStationClick(station)}
                        onMouseOver={() => setActiveMarker({ position: { lat: station.lat, lng: station.lng }, content: station })}
                        icon={getStationMarkerIcon(station)}
                    />
                ))}

                {activeMarker && (
                    <InfoWindowF
                        position={activeMarker.position}
                        onCloseClick={() => setActiveMarker(null)}
                        options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                    >
                       {activeStation ? (
                            <div className="p-1 max-w-xs">
                               <h4 className="font-bold text-base mb-1">{activeStation.name}</h4>
                               <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CircleDotDashed className="h-4 w-4 text-muted-foreground" /> 
                                        <Badge variant={activeStation.status === 'available' ? 'default' : 'destructive'} className="capitalize">
                                            {activeStation.status.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                   <div className="flex items-center gap-2">
                                       <Zap className="h-4 w-4 text-muted-foreground" />
                                       <span>{activeStation.power} kW</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                       <Plug className="h-4 w-4 text-muted-foreground" />
                                       <div className="flex gap-1">
                                        {activeStation.connectors.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                                       </div>
                                   </div>
                                   {activeStation.hasSlotBooking && (
                                    <div className="flex items-center gap-2">
                                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                                        <span>Slot booking available</span>
                                    </div>
                                   )}
                               </div>
                            </div>
                        ) : (
                           <div className="p-1 font-bold">{activeTitle}</div>
                        )}
                    </InfoWindowF>
                )}
                
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}

                {showTraffic && <TrafficLayer autoUpdate />}
              </>
            )}
        </GoogleMap>
    );
}
