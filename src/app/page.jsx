<<<<<<< HEAD
"use client";

import { useState, Suspense, useEffect, useCallback, useRef } from "react";
import { defaultVehicle } from "@/lib/mock-data";
import MapView from "@/components/charge-one/MapView";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { planRoute } from "@/ai/flows/planRoute";
import Header from "@/components/charge-one/Header";
import { createBooking, getUserBookings, cancelBooking } from "@/lib/firestore";
import { differenceInMinutes } from "date-fns";
import { formatDistance, formatDuration } from "./utils";
import LiveNavigationCard from "@/components/charge-one/LiveNavigationCard";
import SidebarNav from "@/components/charge-one/SidebarNav";
import SidebarPanel from "@/components/charge-one/SidebarPanel";
import ChargingSession from "@/components/charge-one/ChargingSession";
import BookingDialog from "@/components/charge-one/BookingDialog";
import FilterDialog from "@/components/charge-one/FilterDialog";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places", "geometry"];
=======

"use client";

import { useState, Suspense, useEffect, useCallback, useRef } from 'react';
import { defaultVehicle } from '@/lib/mock-data';
import MapView from '@/components/charge-one/MapView';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { planRoute } from '@/ai/flows/planRoute';
import Header from '@/components/charge-one/Header';
import { createBooking, getUserBookings, cancelBooking } from '@/lib/firestore';
import { differenceInMinutes } from 'date-fns';
import { formatDistance, formatDuration } from './utils';
import LiveNavigationCard from '@/components/charge-one/LiveNavigationCard';
import SidebarNav from '@/components/charge-one/SidebarNav';
import SidebarPanel from '@/components/charge-one/SidebarPanel';
import ChargingSession from '@/components/charge-one/ChargingSession';
import BookingDialog from '@/components/charge-one/BookingDialog';
import FilterDialog from '@/components/charge-one/FilterDialog';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places', 'geometry'];
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

function HomePageContent() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBMltP754BsiINUjJ90C0HE5YE0As2cTcc",
    libraries,
  });
<<<<<<< HEAD

=======
  
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [userVehicle, setUserVehicle] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
<<<<<<< HEAD
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const [showTraffic, setShowTraffic] = useState(true);
  const [recenterMap, setRecenterMap] = useState(() => () => {});

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [route, setRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [activePanel, setActivePanel] = useState("planner");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([
    "CCS",
    "CHAdeMO",
    "Type 2",
  ]);
=======
  const [mapTypeId, setMapTypeId] = useState('roadmap');
  const [showTraffic, setShowTraffic] = useState(true);
  const [recenterMap, setRecenterMap] = useState(() => () => {});
  
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [route, setRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [activePanel, setActivePanel] = useState('planner');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(['CCS', 'CHAdeMO', 'Type 2']);
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD
  const isGuest = searchParams.get("guest") === "true";

=======
  const isGuest = searchParams.get('guest') === 'true';
  
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

<<<<<<< HEAD
  const fetchUserBookings = useCallback(
    async (uid) => {
      try {
        const bookings = await getUserBookings(uid);
        setUserBookings(bookings);
      } catch (err) {
        console.error("Failed to fetch user bookings:", err);
        toast({
          variant: "destructive",
          title: "Could not load your bookings.",
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push("/login");
    } else if (!loading && (user || isGuest)) {
      const storedVehicle = localStorage.getItem("userVehicle");
=======
  const fetchUserBookings = useCallback(async (uid) => {
    try {
        const bookings = await getUserBookings(uid);
        setUserBookings(bookings);
    } catch (err) {
        console.error("Failed to fetch user bookings:", err);
        toast({ variant: 'destructive', title: 'Could not load your bookings.' });
    }
  }, [toast]);

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push('/login');
    } else if (!loading && (user || isGuest)) {
      const storedVehicle = localStorage.getItem('userVehicle');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      if (storedVehicle) {
        const parsedVehicle = JSON.parse(storedVehicle);
        setUserVehicle(parsedVehicle);
        setActiveFilters([parsedVehicle.connectorType]);
<<<<<<< HEAD
      } else if (isGuest) {
        const guestVehicle = { ...defaultVehicle, currentCharge: 80 };
        setUserVehicle(guestVehicle);
        localStorage.setItem("userVehicle", JSON.stringify(guestVehicle));
        setActiveFilters([guestVehicle.connectorType]);
      } else {
        router.push("/vehicle-details");
=======
      } else if(isGuest) {
        const guestVehicle = { ...defaultVehicle, currentCharge: 80 };
        setUserVehicle(guestVehicle);
        localStorage.setItem('userVehicle', JSON.stringify(guestVehicle));
        setActiveFilters([guestVehicle.connectorType]);
      } else {
        router.push('/vehicle-details');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      }
    }
  }, [user, loading, router, isGuest]);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.uid);
    }
  }, [user, fetchUserBookings]);

  const setOriginToCurrentLocation = useCallback(() => {
    if (currentLocation && originRef.current) {
<<<<<<< HEAD
      if (currentLocation.lat && currentLocation.lng) {
        originRef.current.value = `${currentLocation.lat.toFixed(
          6
        )}, ${currentLocation.lng.toFixed(6)}`;
      }
=======
        if (currentLocation.lat && currentLocation.lng) {
            originRef.current.value = `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`;
        }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
  }, [currentLocation]);

  useEffect(() => {
<<<<<<< HEAD
    if (activePanel === "planner" && isLoaded) {
      setOriginToCurrentLocation();
    }
  }, [activePanel, setOriginToCurrentLocation, isLoaded]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station) {
      setActivePanel(null); // Close panel to show charging session
    } else {
      setActivePanel("planner"); // Re-open planner when deselected
    }
  };

  const handleEndSession = (cost) => {
    setWalletBalance((prev) => prev - cost);
    setSelectedStation(null);
    setActivePanel("planner");
=======
    if (activePanel === 'planner' && isLoaded) {
      setOriginToCurrentLocation();
    }
  }, [activePanel, setOriginToCurrentLocation, isLoaded]);
  
  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if(station) {
      setActivePanel(null); // Close panel to show charging session
    } else {
      setActivePanel('planner'); // Re-open planner when deselected
    }
  };
  
  const handleEndSession = (cost) => {
    setWalletBalance((prev) => prev - cost);
    setSelectedStation(null);
    setActivePanel('planner');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  };

  const handleRecharge = (amount) => {
    setWalletBalance((prev) => prev + amount);
    setIsRechargeOpen(false);
    toast({
<<<<<<< HEAD
      title: "Recharge Successful",
      description: `Successfully added ₹${amount.toFixed(2)} to your wallet.`,
    });
  };

  async function calculateRoute() {
    if (
      !originRef.current?.value ||
      !destinationRef.current?.value ||
      !userVehicle
    ) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide an origin, destination, and vehicle.",
      });
      return;
    }

=======
        title: "Recharge Successful",
        description: `Successfully added ₹${amount.toFixed(2)} to your wallet.`,
    });
  }
  
  async function calculateRoute() {
    if (!originRef.current?.value || !destinationRef.current?.value || !userVehicle) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please provide an origin, destination, and vehicle.' });
      return;
    }
    
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    setLoadingRoute(true);
    try {
      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
<<<<<<< HEAD

=======
      
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      const result = await planRoute({
        origin,
        destination,
        vehicle: userVehicle,
      });

      setRoute(result);
      setDirectionsResponse(result.route);
<<<<<<< HEAD
      setStations((prevStations) => {
        const existingStationIds = new Set(prevStations.map((s) => s.id));
        const newStations = result.requiredChargingStations.filter(
          (s) => !existingStationIds.has(s.id)
        );
        return [...prevStations, ...newStations];
      });
      setActivePanel(null); // Hide panel to show navigation card
    } catch (error) {
      console.error("Error planning route:", error);
      toast({
        variant: "destructive",
        title: "Route Planning Failed",
        description: "Could not calculate a route. Please try again.",
      });
=======
      setStations(prevStations => {
        const existingStationIds = new Set(prevStations.map(s => s.id));
        const newStations = result.requiredChargingStations.filter(s => !existingStationIds.has(s.id));
        return [...prevStations, ...newStations];
      });
      setActivePanel(null); // Hide panel to show navigation card
      
    } catch (error) {
      console.error("Error planning route:", error);
      toast({ variant: 'destructive', title: 'Route Planning Failed', description: 'Could not calculate a route. Please try again.' });
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      setRoute(null);
      setDirectionsResponse(null);
    } finally {
      setLoadingRoute(false);
    }
  }

  const clearRoute = useCallback(() => {
    setRoute(null);
    setDirectionsResponse(null);
<<<<<<< HEAD
    if (destinationRef.current) destinationRef.current.value = "";
    if (originRef.current) originRef.current.value = "";
    setOriginToCurrentLocation();
    setActivePanel("planner");
  }, [setOriginToCurrentLocation]);

  const handleBookingConfirm = async (date, time) => {
    if (!user || !selectedStation) {
      toast({
        variant: "destructive",
        title: "Cannot create booking",
        description: "You must be signed in and select a station.",
      });
=======
    if (destinationRef.current) destinationRef.current.value = '';
    if (originRef.current) originRef.current.value = '';
    setOriginToCurrentLocation();
    setActivePanel('planner');
  }, [setOriginToCurrentLocation]);
  
  const handleBookingConfirm = async (date, time) => {
    if (!user || !selectedStation) {
      toast({ variant: "destructive", title: "Cannot create booking", description: "You must be signed in and select a station." });
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      return;
    }

    setIsBookingOpen(false);

<<<<<<< HEAD
    const [hours, minutes] = time.split(":");
=======
    const [hours, minutes] = time.split(':');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(parseInt(hours, 10));
    bookingDateTime.setMinutes(parseInt(minutes, 10));
    bookingDateTime.setSeconds(0);

    try {
      await createBooking(user.uid, selectedStation, bookingDateTime);
      await fetchUserBookings(user.uid);
      toast({
        title: "Slot Booked!",
<<<<<<< HEAD
        description: `Your slot at ${
          selectedStation?.name
        } is confirmed for ${bookingDateTime.toLocaleDateString()} at ${time}.`,
=======
        description: `Your slot at ${selectedStation?.name} is confirmed for ${bookingDateTime.toLocaleDateString()} at ${time}.`,
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      });
    } catch (error) {
      console.error("Booking failed:", error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Could not book the slot. Please try again.",
      });
    }
<<<<<<< HEAD
  };

  const handleCancelBooking = async (booking) => {
    if (!user) return;

    const minutesToBooking = differenceInMinutes(
      booking.bookingTime,
      new Date()
    );

=======
  }

  const handleCancelBooking = async (booking) => {
    if (!user) return;
  
    const minutesToBooking = differenceInMinutes(booking.bookingTime, new Date());
  
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    if (minutesToBooking < 15) {
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
<<<<<<< HEAD
        description:
          "Bookings can only be cancelled up to 15 minutes before the start time.",
      });
      return;
    }

=======
        description: "Bookings can only be cancelled up to 15 minutes before the start time.",
      });
      return;
    }
  
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    try {
      await cancelBooking(booking.id);
      await fetchUserBookings(user.uid);
      toast({
        title: "Booking Cancelled",
        description: `Your booking at ${booking.stationName} has been cancelled.`,
      });
    } catch (error) {
      console.error("Cancellation failed:", error);
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: "Could not cancel the booking. Please try again.",
      });
    }
  };

  const handleStationsFound = useCallback((foundStations) => {
    setStations(foundStations);
  }, []);

  const handlePanelToggle = (panel) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
    // Clear route and selection when opening a panel
<<<<<<< HEAD
    if (route) clearRoute();
    if (selectedStation) setSelectedStation(null);
  };

  const onOriginPlaceChanged = () => {
    if (originAutocomplete !== null && originRef.current) {
      const place = originAutocomplete.getPlace();
      originRef.current.value = place.formatted_address || place.name || "";
=======
    if(route) clearRoute();
    if(selectedStation) setSelectedStation(null);
  };
  
  const onOriginPlaceChanged = () => {
    if (originAutocomplete !== null && originRef.current) {
        const place = originAutocomplete.getPlace();
        originRef.current.value = place.formatted_address || place.name || '';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
  };

  const onDestinationPlaceChanged = () => {
<<<<<<< HEAD
    if (destinationAutocomplete !== null && destinationRef.current) {
      const place = destinationAutocomplete.getPlace();
      destinationRef.current.value =
        place.formatted_address || place.name || "";
    }
  };

  if (
    loading ||
    (!user && !isGuest) ||
    !userVehicle ||
    !isLoaded ||
    loadError
  ) {
    return (
      <div className="relative h-screen w-screen">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-2 border">
          <Skeleton className="h-16 w-[90vw] sm:w-[400px]" />
        </div>
        <div className="absolute top-24 left-4 z-10">
          <Skeleton className="h-[600px] w-[400px]" />
        </div>
      </div>
    );
  }

  const activeBookingForSelectedStation = selectedStation
    ? userBookings.find((b) => b.stationId === selectedStation.id)
    : null;
  const bookedStationIds = userBookings.map((b) => b.stationId);
  const hasActiveRoute = !!route && !!directionsResponse;

  const navigationData = hasActiveRoute
    ? {
        distance: formatDistance(route.totalDistance),
        duration: formatDuration(route.totalDuration),
        endAddress: directionsResponse.routes[0].legs[0].end_address,
      }
    : null;

  let mainContent = null;
  if (selectedStation) {
    mainContent = (
      <ChargingSession
        station={selectedStation}
        vehicle={userVehicle}
        onEndSession={handleEndSession}
        onClearSelection={() => handleStationSelect(null)}
        onBookSlot={() => setIsBookingOpen(true)}
        isGuest={isGuest}
        activeBooking={activeBookingForSelectedStation}
        hasOtherBooking={
          userBookings.length > 0 && !activeBookingForSelectedStation
        }
        onCancelBooking={handleCancelBooking}
      />
    );
  } else if (hasActiveRoute && navigationData) {
    mainContent = (
      <LiveNavigationCard data={navigationData} onClearRoute={clearRoute} />
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SidebarNav
        activePanel={activePanel}
        onPanelToggle={handlePanelToggle}
        isGuest={isGuest}
      />

      {isLoaded && (
        <div className="absolute top-24 left-20 z-10 w-[380px]">
          {mainContent}
        </div>
      )}

      {isLoaded && (
        <SidebarPanel
          activePanel={activePanel}
          onClose={() => setActivePanel(null)}
          isGuest={isGuest}
          userVehicle={userVehicle}
          walletBalance={walletBalance}
          onRechargeClick={() => setIsRechargeOpen(true)}
          onPlanRoute={calculateRoute}
          originRef={originRef}
          destinationRef={destinationRef}
          loadingRoute={loadingRoute}
          onUseMyLocation={setOriginToCurrentLocation}
          userBookings={userBookings}
          onCancelBooking={handleCancelBooking}
          onSelectStation={handleStationSelect}
          isRechargeOpen={isRechargeOpen}
          setIsRechargeOpen={setIsRechargeOpen}
          handleRecharge={handleRecharge}
          setOriginAutocomplete={setOriginAutocomplete}
          setDestinationAutocomplete={setDestinationAutocomplete}
          onOriginPlaceChanged={onOriginPlaceChanged}
          onDestinationPlaceChanged={onDestinationPlaceChanged}
        />
      )}

      <div className="h-full w-full">
        {isLoaded && (
          <Header
            mapTypeId={mapTypeId}
            onMapTypeIdChange={setMapTypeId}
            showTraffic={showTraffic}
            onShowTrafficChange={setShowTraffic}
            onRecenter={recenterMap}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        )}
        <MapView
          isLoaded={isLoaded}
          onStationsFound={handleStationsFound}
          stations={stations}
          onStationClick={handleStationSelect}
          directionsResponse={directionsResponse}
          onLocationUpdate={setCurrentLocation}
          currentLocation={currentLocation}
          mapTypeId={mapTypeId}
          showTraffic={showTraffic}
          bookedStationIds={bookedStationIds}
          setRecenterCallback={setRecenterMap}
          activeFilters={activeFilters}
        />
      </div>
      <Toaster />
      <BookingDialog
        isOpen={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        station={selectedStation}
        onConfirm={handleBookingConfirm}
      />
      <FilterDialog
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        activeFilters={activeFilters}
        onFiltersChange={setActiveFilters}
        userVehicleConnector={userVehicle?.connectorType}
      />
    </div>
=======
      if (destinationAutocomplete !== null && destinationRef.current) {
          const place = destinationAutocomplete.getPlace();
          destinationRef.current.value = place.formatted_address || place.name || '';
      }
  };


  if (loading || (!user && !isGuest) || !userVehicle || !isLoaded || loadError) {
    return (
        <div className="relative h-screen w-screen">
            <Skeleton className="h-full w-full" />
            <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-2 border">
                <Skeleton className="h-16 w-[90vw] sm:w-[400px]" />
            </div>
             <div className="absolute top-24 left-4 z-10">
                <Skeleton className="h-[600px] w-[400px]" />
            </div>
        </div>
    );
  }
  
  const activeBookingForSelectedStation = selectedStation ? userBookings.find(b => b.stationId === selectedStation.id) : null;
  const bookedStationIds = userBookings.map(b => b.stationId);
  const hasActiveRoute = !!route && !!directionsResponse;
  
  const navigationData = hasActiveRoute ? {
    distance: formatDistance(route.totalDistance),
    duration: formatDuration(route.totalDuration),
    endAddress: directionsResponse.routes[0].legs[0].end_address,
  } : null;

  let mainContent = null;
  if(selectedStation) {
      mainContent = (
          <ChargingSession
            station={selectedStation}
            vehicle={userVehicle}
            onEndSession={handleEndSession}
            onClearSelection={() => handleStationSelect(null)}
            onBookSlot={() => setIsBookingOpen(true)}
            isGuest={isGuest}
            activeBooking={activeBookingForSelectedStation}
            hasOtherBooking={userBookings.length > 0 && !activeBookingForSelectedStation}
            onCancelBooking={handleCancelBooking}
          />
      );
  } else if (hasActiveRoute && navigationData) {
      mainContent = <LiveNavigationCard data={navigationData} onClearRoute={clearRoute} />;
  }

  return (
      <div className="relative h-screen w-screen overflow-hidden">
        <SidebarNav activePanel={activePanel} onPanelToggle={handlePanelToggle} isGuest={isGuest} />
        
        {isLoaded && <div className="absolute top-24 left-20 z-10 w-[380px]">
          {mainContent}
        </div>}
        
        {isLoaded && <SidebarPanel
            activePanel={activePanel}
            onClose={() => setActivePanel(null)}
            isGuest={isGuest}
            userVehicle={userVehicle}
            walletBalance={walletBalance}
            onRechargeClick={() => setIsRechargeOpen(true)}
            onPlanRoute={calculateRoute}
            originRef={originRef}
            destinationRef={destinationRef}
            loadingRoute={loadingRoute}
            onUseMyLocation={setOriginToCurrentLocation}
            userBookings={userBookings}
            onCancelBooking={handleCancelBooking}
            onSelectStation={handleStationSelect}
            isRechargeOpen={isRechargeOpen}
            setIsRechargeOpen={setIsRechargeOpen}
            handleRecharge={handleRecharge}
            setOriginAutocomplete={setOriginAutocomplete}
            setDestinationAutocomplete={setDestinationAutocomplete}
            onOriginPlaceChanged={onOriginPlaceChanged}
            onDestinationPlaceChanged={onDestinationPlaceChanged}
        /> }
        
        <div className="h-full w-full">
            {isLoaded && <Header 
              mapTypeId={mapTypeId}
              onMapTypeIdChange={setMapTypeId}
              showTraffic={showTraffic}
              onShowTrafficChange={setShowTraffic}
              onRecenter={recenterMap}
              onFilterClick={() => setIsFilterOpen(true)}
            />}
            <MapView 
                isLoaded={isLoaded}
                onStationsFound={handleStationsFound} 
                stations={stations}
                onStationClick={handleStationSelect}
                directionsResponse={directionsResponse}
                onLocationUpdate={setCurrentLocation}
                currentLocation={currentLocation}
                mapTypeId={mapTypeId}
                showTraffic={showTraffic}
                bookedStationIds={bookedStationIds}
                setRecenterCallback={setRecenterMap}
                activeFilters={activeFilters}
            />
        </div>
        <Toaster />
        <BookingDialog
          isOpen={isBookingOpen}
          onOpenChange={setIsBookingOpen}
          station={selectedStation}
          onConfirm={handleBookingConfirm}
        />
        <FilterDialog
          isOpen={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          activeFilters={activeFilters}
          onFiltersChange={setActiveFilters}
          userVehicleConnector={userVehicle?.connectorType}
        />
      </div>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  );
}

export default function Home() {
  return (
<<<<<<< HEAD
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen bg-background">
          <p>Loading...</p>
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
=======
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-background"><p>Loading...</p></div>}>
      <HomePageContent />
    </Suspense>
  )
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
}
