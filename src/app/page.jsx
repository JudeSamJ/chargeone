
"use client";

import { useState, Suspense, useEffect, useCallback, useRef } from 'react';
import { defaultVehicle } from '@/lib/mock-data';
import MapView from '@/components/charge-one/MapView';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { findStations } from '@/ai/flows/findStations';
import Controls from '@/components/charge-one/Controls';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarRail } from '@/components/ui/sidebar';
import Header from '@/components/charge-one/Header';
import { createBooking, getUserBookings, cancelBooking } from '@/lib/firestore';
import { differenceInMinutes } from 'date-fns';

function HomePageContent() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [userVehicle, setUserVehicle] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapTypeId, setMapTypeId] = useState('roadmap');
  const [showTraffic, setShowTraffic] = useState(false);
  const [recenterMap, setRecenterMap] = useState(() => () => {});
  
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGuest = searchParams.get('guest') === 'true';
  
  const originRef = useRef();
  const destinationRef = useRef();

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
      if (storedVehicle) {
        setUserVehicle(JSON.parse(storedVehicle));
      } else if(isGuest) {
        const guestVehicle = { ...defaultVehicle, currentCharge: 80 };
        setUserVehicle(guestVehicle);
        localStorage.setItem('userVehicle', JSON.stringify(guestVehicle));
      }
      else if (user) {
        router.push('/vehicle-details');
      }
    }
  }, [user, loading, router, isGuest]);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.uid);
    }
  }, [user, fetchUserBookings]);

  
  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  const handleEndSession = (cost) => {
    setWalletBalance((prev) => prev - cost);
    setSelectedStation(null);
  };

  const handleRecharge = (amount) => {
    setWalletBalance((prev) => prev + amount);
    setIsRechargeOpen(false);
    toast({
        title: "Recharge Successful",
        description: `Successfully added ₹${amount.toFixed(2)} to your wallet.`,
    });
  }
  
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  }
  
  const handleBookingConfirm = async (date, time) => {
    if (!user || !selectedStation) {
      toast({ variant: "destructive", title: "Cannot create booking", description: "You must be signed in and select a station." });
      return;
    }

    setIsBookingOpen(false);

    // Combine date and time
    const [hours, minutes] = time.split(':');
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(parseInt(hours, 10));
    bookingDateTime.setMinutes(parseInt(minutes, 10));
    bookingDateTime.setSeconds(0);

    try {
      await createBooking(user.uid, selectedStation, bookingDateTime);
      await fetchUserBookings(user.uid); // Refresh bookings
      toast({
        title: "Slot Booked!",
        description: `Your slot at ${selectedStation?.name} is confirmed for ${bookingDateTime.toLocaleDateString()} at ${time}.`,
      });
    } catch (error) {
      console.error("Booking failed:", error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Could not book the slot. Please try again.",
      });
    }
  }

  const handleCancelBooking = async (booking) => {
    if (!user) return;
  
    const minutesToBooking = differenceInMinutes(booking.bookingTime, new Date());
  
    if (minutesToBooking < 15) {
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: "Bookings can only be cancelled up to 15 minutes before the start time.",
      });
      return;
    }
  
    try {
      await cancelBooking(booking.id);
      await fetchUserBookings(user.uid); // Refresh bookings
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

  if (loading || (!user && !isGuest) || !userVehicle) {
    return (
        <div className="relative h-screen w-screen">
            <Skeleton className="h-full w-full" />
            <div className="absolute top-4 left-4 z-10">
                <Skeleton className="h-[600px] w-[400px]" />
            </div>
        </div>
    );
  }
  
  const activeBookingForSelectedStation = selectedStation ? userBookings.find(b => b.stationId === selectedStation.id) : null;
  const bookedStationIds = userBookings.map(b => b.stationId);

  return (
      <SidebarProvider>
        <Sidebar variant="floating" side="left">
          <SidebarRail />
          <SidebarContent className="p-4">
              <Controls
                  userVehicle={userVehicle}
                  walletBalance={walletBalance}
                  setIsRechargeOpen={setIsRechargeOpen}
                  selectedStation={selectedStation}
                  handleEndSession={handleEndSession}
                  handleStationSelect={handleStationSelect}
                  onPlanRoute={calculateRoute}
                  isRechargeOpen={isRechargeOpen}
                  handleRecharge={handleRecharge}
                  currentLocation={currentLocation}
                  hasRoute={!!directionsResponse}
                  onClearRoute={clearRoute}
                  isBookingOpen={isBookingOpen}
                  setIsBookingOpen={setIsBookingOpen}
                  onBookingConfirm={handleBookingConfirm}
                  isGuest={isGuest}
                  userBookings={userBookings}
                  onCancelBooking={handleCancelBooking}
                  activeBookingForSelectedStation={activeBookingForSelectedStation}
                  originRef={originRef}
                  destinationRef={destinationRef}
                  distance={distance}
                  duration={duration}
              />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Header 
            mapTypeId={mapTypeId}
            onMapTypeIdChange={setMapTypeId}
            showTraffic={showTraffic}
            onShowTrafficChange={setShowTraffic}
            onRecenter={recenterMap}
          />
            <MapView 
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
            />
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-background"><p>Loading...</p></div>}>
      <HomePageContent />
    </Suspense>
  )
}
