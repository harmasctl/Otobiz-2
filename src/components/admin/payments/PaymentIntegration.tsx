import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onCancel: () => void;
}

export default function PaymentIntegration({
  amount,
  onSuccess,
  onCancel,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess(`payment_${Date.now()}`);
    }, 2000);
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <Lock className="text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Amount</Label>
          <div className="text-2xl font-bold">£{amount.toFixed(2)}</div>
        </div>

        <div className="space-y-2">
          <Label>Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="4242 4242 4242 4242"
              className="pl-10"
              maxLength={19}
              pattern="[0-9 ]{13,19}"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Input
              placeholder="MM/YY"
              maxLength={5}
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>CVC</Label>
            <Input
              placeholder="123"
              maxLength={3}
              pattern="[0-9]{3}"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Processing..." : `Pay £${amount.toFixed(2)}`}
          </Button>
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Secured by Stripe. We never store your card details.
        </div>
      </form>
    </Card>
  );
}
