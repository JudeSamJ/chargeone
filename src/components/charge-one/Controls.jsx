
"use client";

import WalletCard from "./WalletCard";
import VehicleStatusCard from "./VehicleStatusCard";
import ChargingSession from "./ChargingSession";
import RoutePlanner from "./RoutePlanner";
import RechargeDialog from "./RechargeDialog";
import BookingDialog from "./BookingDialog";
import MyBookings from "./MyBookings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Route, CalendarDays } from 'lucide-react';


export default function Controls({
    userVehicle,
    walletBalance,
    setIsRechargeOpen,
    selectedStation,
    handleEndSession,
    handleStationSelect,
    onPlanRoute,
    loadingRoute,
    isRechargeOpen,
    handleRecharge,
    hasRoute,
    onClearRoute,
    isBookingOpen,
    setIsBookingOpen,
    onBookingConfirm,
    isGuest,
    userBookings,
    onCancelBooking,
    activeBookingForSelectedStation,
    originRef,
    destinationRef,
    navigationCard
}) {

    return (
        <>
            <div className="space-y-4">
                <WalletCard balance={walletBalance} onRecharge={() => setIsRechargeOpen(true)} />
                <VehicleStatusCard vehicle={userVehicle} />
                {selectedStation ? (
                    <ChargingSession
                        station={selectedStation}
                        onEndSession={handleEndSession}
                        onClearSelection={() => handleStationSelect(null)}
                        vehicle={userVehicle}
                        onBookSlot={() => setIsBookingOpen(true)}
                        isGuest={isGuest}
                        onCancelBooking={onCancelBooking}
                        activeBooking={activeBookingForSelectedStation}
                        hasOtherBooking={userBookings.length > 0 && !activeBookingForSelectedStation}
                    />
                ) : hasRoute ? (
                    navigationCard
                ) : (
                    <Tabs defaultValue="planner" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="planner"><Route className="mr-2"/>Planner</TabsTrigger>
                            <TabsTrigger value="bookings" disabled={isGuest}><CalendarDays className="mr-2"/>Bookings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="planner">
                            <RoutePlanner 
                                onPlanRoute={onPlanRoute} 
                                originRef={originRef}
                                destinationRef={destinationRef}
                                loading={loadingRoute}
                            />
                        </TabsContent>
                        <TabsContent value="bookings">
                            <MyBookings 
                                bookings={userBookings} 
                                onCancelBooking={onCancelBooking} 
                                onSelectStation={handleStationSelect}
                            />
                        </TabsContent>
                    </Tabs>
                )}
            </div>
             <RechargeDialog 
                isOpen={isRechargeOpen}
                onOpenChange={setIsRechargeOpen}
                onRecharge={handleRecharge}
                razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""} 
            />
            <BookingDialog
                isOpen={isBookingOpen}
                onOpenChange={setIsBookingOpen}
                station={selectedStation}
                onConfirm={onBookingConfirm}
            />
        </>
    );
}
