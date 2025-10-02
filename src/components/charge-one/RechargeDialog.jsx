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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function RechargeDialog({
  isOpen,
  onOpenChange,
  onRecharge,
  razorpayKeyId,
}) {
  const [amount, setAmount] = useState("");
=======
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function RechargeDialog({ isOpen, onOpenChange, onRecharge, razorpayKeyId }) {
  const [amount, setAmount] = useState('');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  const { toast } = useToast();
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    const scriptId = "razorpay-checkout-js";
=======
    const scriptId = 'razorpay-checkout-js';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    if (document.getElementById(scriptId) || window.Razorpay) {
      setIsRazorpayLoaded(true);
      return;
    }

<<<<<<< HEAD
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
=======
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    script.async = true;
    script.onload = () => {
      setIsRazorpayLoaded(true);
    };
    script.onerror = () => {
<<<<<<< HEAD
      console.error("Razorpay script failed to load.");
      setIsRazorpayLoaded(false);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description:
          "Could not load the payment gateway. Please check your connection and try again.",
=======
      console.error('Razorpay script failed to load.');
      setIsRazorpayLoaded(false);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Could not load the payment gateway. Please check your connection and try again.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      });
    };

    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [toast]);

  const handleRechargeClick = () => {
    const rechargeAmount = parseFloat(amount);
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      toast({
<<<<<<< HEAD
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount to recharge.",
=======
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to recharge.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      });
      return;
    }

    if (!isRazorpayLoaded || !window.Razorpay) {
      toast({
<<<<<<< HEAD
        variant: "destructive",
        title: "Error",
        description:
          "Payment gateway is not ready yet. Please try again in a moment.",
=======
        variant: 'destructive',
        title: 'Error',
        description: 'Payment gateway is not ready yet. Please try again in a moment.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      });
      return;
    }

    const options = {
      key: razorpayKeyId,
      amount: rechargeAmount * 100,
<<<<<<< HEAD
      currency: "INR",
      name: "ChargeOne Wallet",
      description: "Recharge your wallet",
      image: "https://placehold.co/100x100.png",
      handler: () => {
        onRecharge(rechargeAmount);
        setAmount("");
        onOpenChange(false);
      },
      prefill: {
        contact: "9000000000",
        email: "guest@chargeone.com",
        name: "Guest User",
      },
      notes: {
        address: "ChargeOne Corporate Office",
      },
      theme: {
        color: "#1976D2",
=======
      currency: 'INR',
      name: 'ChargeOne Wallet',
      description: 'Recharge your wallet',
      image: 'https://placehold.co/100x100.png',
      handler: () => {
        onRecharge(rechargeAmount);
        setAmount('');
        onOpenChange(false);
      },
      prefill: {
        contact: '9000000000',
        email: 'guest@chargeone.com',
        name: 'Guest User',
      },
      notes: {
        address: 'ChargeOne Corporate Office',
      },
      theme: {
        color: '#1976D2',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
<<<<<<< HEAD
      rzp1.on("payment.failed", (response) => {
        console.error("Razorpay Payment Failed:", response.error);
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description:
            response.error.description || "An unknown error occurred.",
=======
      rzp1.on('payment.failed', (response) => {
        console.error('Razorpay Payment Failed:', response.error);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: response.error.description || 'An unknown error occurred.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        });
        onOpenChange(false);
      });
      rzp1.open();
    } catch (error) {
<<<<<<< HEAD
      console.error("Error initializing Razorpay", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not initialize payment flow. Please try again.",
=======
      console.error('Error initializing Razorpay', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not initialize payment flow. Please try again.',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      });
    }
  };

  const quickAmounts = [500, 1000, 2000];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recharge Wallet</DialogTitle>
<<<<<<< HEAD
          <DialogDescription>
            Add funds to your wallet using Razorpay.
          </DialogDescription>
=======
          <DialogDescription>Add funds to your wallet using Razorpay.</DialogDescription>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((qAmount) => (
<<<<<<< HEAD
              <Button
                key={qAmount}
                variant="outline"
                onClick={() => setAmount(qAmount.toString())}
              >
=======
              <Button key={qAmount} variant="outline" onClick={() => setAmount(qAmount.toString())}>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
                ₹{qAmount}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1500"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
            <img
              src="https://razorpay.com/assets/razorpay-logo.svg"
              alt="Razorpay"
              className="h-8 mb-2"
            />
            <p className="text-sm text-muted-foreground">Secure Payments</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleRechargeClick}
            className="w-full"
<<<<<<< HEAD
            disabled={
              !isRazorpayLoaded ||
              !razorpayKeyId ||
              !amount ||
              parseFloat(amount) <= 0
            }
=======
            disabled={!isRazorpayLoaded || !razorpayKeyId || !amount || parseFloat(amount) <= 0}
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
          >
            Recharge with Razorpay
          </Button>
          {!razorpayKeyId && (
            <p className="text-xs text-destructive text-center w-full">
              Razorpay Key ID not configured.
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
