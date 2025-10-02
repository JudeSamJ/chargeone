<<<<<<< HEAD
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { X } from "lucide-react";
=======

"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
import WalletCard from "./WalletCard";
import VehicleStatusCard from "./VehicleStatusCard";
import RoutePlanner from "./RoutePlanner";
import MyBookings from "./MyBookings";
<<<<<<< HEAD
import RechargeDialog from "./RechargeDialog";

const panelVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function SidebarPanel({
  activePanel,
  onClose,
  isGuest,
  userVehicle,
  walletBalance,
  onRechargeClick,
  onPlanRoute,
  originRef,
  destinationRef,
  loadingRoute,
  onUseMyLocation,
  userBookings,
  onCancelBooking,
  isRechargeOpen,
  setIsRechargeOpen,
  handleRecharge,
  setOriginAutocomplete,
  setDestinationAutocomplete,
  onOriginPlaceChanged,
  onDestinationPlaceChanged,
}) {
  const getPanelContent = () => {
    switch (activePanel) {
      case "wallet":
=======
import RechargeDialog from './RechargeDialog';

const panelVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function SidebarPanel({ 
    activePanel, 
    onClose,
    isGuest,
    userVehicle,
    walletBalance,
    onRechargeClick,
    onPlanRoute,
    originRef,
    destinationRef,
    loadingRoute,
    onUseMyLocation,
    userBookings,
    onCancelBooking,
    isRechargeOpen,
    setIsRechargeOpen,
    handleRecharge,
    setOriginAutocomplete,
    setDestinationAutocomplete,
    onOriginPlaceChanged,
    onDestinationPlaceChanged,
}) {
  const getPanelContent = () => {
    switch (activePanel) {
      case 'wallet':
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        return (
          <>
            <h2 className="text-xl font-bold mb-4">My Wallet</h2>
            <WalletCard balance={walletBalance} onRecharge={onRechargeClick} />
          </>
        );
<<<<<<< HEAD
      case "vehicle":
=======
      case 'vehicle':
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        return (
          <>
            <h2 className="text-xl font-bold mb-4">My Vehicle</h2>
            <VehicleStatusCard vehicle={userVehicle} />
          </>
        );
<<<<<<< HEAD
      case "planner":
=======
      case 'planner':
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Route Planner</h2>
            <RoutePlanner
              onPlanRoute={onPlanRoute}
              originRef={originRef}
              destinationRef={destinationRef}
              loading={loadingRoute}
              onUseMyLocation={onUseMyLocation}
              setOriginAutocomplete={setOriginAutocomplete}
              setDestinationAutocomplete={setDestinationAutocomplete}
              onOriginPlaceChanged={onOriginPlaceChanged}
              onDestinationPlaceChanged={onDestinationPlaceChanged}
            />
          </>
        );
<<<<<<< HEAD
      case "bookings":
=======
      case 'bookings':
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        return (
          <>
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            <MyBookings
              bookings={userBookings}
              onCancelBooking={onCancelBooking}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
<<<<<<< HEAD
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
=======
            transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.2 }}
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
            className="absolute top-0 left-16 h-full w-[400px] bg-background border-r p-4 z-20 shadow-lg"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
<<<<<<< HEAD
            <div className="pt-8">{getPanelContent()}</div>
=======
            <div className="pt-8">
                {getPanelContent()}
            </div>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
          </motion.div>
        )}
      </AnimatePresence>

      <RechargeDialog
        isOpen={isRechargeOpen}
        onOpenChange={setIsRechargeOpen}
        onRecharge={handleRecharge}
        razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
      />
    </>
  );
}
