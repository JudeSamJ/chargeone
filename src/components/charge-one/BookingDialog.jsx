<<<<<<< HEAD
"use client";

import { useState } from "react";
=======

"use client";

import { useState } from 'react';
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
import { Calendar } from "@/components/ui/calendar";
=======
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
<<<<<<< HEAD
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BookingDialog({
  isOpen,
  onOpenChange,
  station,
  onConfirm,
}) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
=======
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function BookingDialog({ isOpen, onOpenChange, station, onConfirm }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
<<<<<<< HEAD
      slots.push(`${i.toString().padStart(2, "0")}:00`);
      slots.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleConfirm = () => {
    if (date && time) {
      onConfirm(date, time);
=======
        slots.push(`${i.toString().padStart(2, '0')}:00`);
        slots.push(`${i.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  const handleConfirm = () => {
    if (date && time) {
        onConfirm(date, time);
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Slot at {station?.name}</DialogTitle>
          <DialogDescription>
            Select a date and time for your charging session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
<<<<<<< HEAD
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) =>
                d < new Date(new Date().setDate(new Date().getDate() - 1))
              }
              className="rounded-md border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-slot">Time Slot</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time-slot">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!date || !time}>
            Confirm Booking
          </Button>
=======
            <div className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                    className="rounded-md border"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="time-slot">Time Slot</Label>
                <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time-slot">
                        <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleConfirm} disabled={!date || !time}>
                Confirm Booking
            </Button>
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
