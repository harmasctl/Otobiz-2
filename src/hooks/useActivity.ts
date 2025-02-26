import { useState, useEffect } from "react";
import { getRecentActivity } from "@/lib/activity";
import { useRealtimeSubscription } from "@/lib/hooks/useRealtimeSubscription";

export function useActivity(limit = 10) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  useRealtimeSubscription("activity_logs", ["INSERT"], () => {
    fetchActivities();
  });

  async function fetchActivities() {
    setLoading(true);
    try {
      const data = await getRecentActivity(limit);
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  }

  return { activities, loading, refetch: fetchActivities };
}
