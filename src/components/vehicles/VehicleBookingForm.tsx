import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "14:00", available: false },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

const VehicleBookingForm: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Schedule Test Drive</h2>
        <p className="text-gray-600">Select your preferred date and time</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <Label className="mb-4 block">Select Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </Card>

        <Card className="p-6">
          <Label className="mb-4 block">Select Time</Label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={selectedTime === slot.time ? "default" : "outline"}
                className="justify-start"
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
              >
                <Clock className="mr-2 h-4 w-4" />
                {slot.time}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Enter last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter email address" />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input type="tel" placeholder="Enter phone number" />
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Input placeholder="Any special requests or questions?" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <p className="text-gray-600">Review your test drive details</p>
          </div>
          {date && selectedTime && (
            <div className="text-right">
              <div className="font-medium">{format(date, "MMMM d, yyyy")}</div>
              <div className="text-gray-600">{selectedTime}</div>
            </div>
          )}
        </div>

        <Button className="w-full">Confirm Booking</Button>
      </Card>
    </div>
  );
};

export default VehicleBookingForm;
