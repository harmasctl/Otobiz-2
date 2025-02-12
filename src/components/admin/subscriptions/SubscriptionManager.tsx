import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface Subscription {
  id: string;
  plan: string;
  status: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
  nextBilling?: string;
  price: number;
}

interface SubscriptionManagerProps {
  currentSubscription?: Subscription;
  onUpgrade: () => void;
  onCancel: () => void;
  onRenew: () => void;
}

export default function SubscriptionManager({
  currentSubscription,
  onUpgrade,
  onCancel,
  onRenew,
}: SubscriptionManagerProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {currentSubscription ? (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {currentSubscription.plan}
                </h3>
                <Badge className={getStatusColor(currentSubscription.status)}>
                  {currentSubscription.status}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  £{currentSubscription.price}
                </div>
                <div className="text-sm text-gray-600">per month</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  Started:{" "}
                  {new Date(currentSubscription.startDate).toLocaleDateString()}
                </span>
              </div>
              {currentSubscription.nextBilling && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>
                    Next billing:{" "}
                    {new Date(
                      currentSubscription.nextBilling,
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
              {currentSubscription.endDate && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span>
                    Ends:{" "}
                    {new Date(currentSubscription.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {currentSubscription.status === "active" && (
                <>
                  <Button className="w-full" onClick={onUpgrade}>
                    Upgrade Plan
                  </Button>
                  {showCancelConfirm ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Are you sure you want to cancel?
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={onCancel}
                        >
                          Yes, Cancel
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setShowCancelConfirm(false)}
                        >
                          No, Keep Plan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </>
              )}
              {currentSubscription.status === "cancelled" && (
                <Button className="w-full" onClick={onRenew}>
                  Renew Subscription
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">No active subscription</p>
            <Button onClick={onUpgrade}>Choose a Plan</Button>
          </div>
        )}
      </div>
    </Card>
  );
}
