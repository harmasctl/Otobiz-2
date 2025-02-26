import { useEffect } from "react";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import { useRealtimeSubscription } from "@/lib/hooks/useRealtimeSubscription";

export function useRealtimeAnalytics() {
  const { fetchAnalytics } = useAnalyticsStore();

  useRealtimeSubscription("transactions", ["INSERT", "UPDATE"], () => {
    fetchAnalytics();
  });

  useRealtimeSubscription("users", ["INSERT", "UPDATE"], () => {
    fetchAnalytics();
  });

  useRealtimeSubscription("vehicles", ["INSERT", "UPDATE"], () => {
    fetchAnalytics();
  });

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);
}
