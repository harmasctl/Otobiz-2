import { useEffect } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useRealtimeSubscription } from "@/lib/hooks/useRealtimeSubscription";

export function useSettings() {
  const { settings, loading, error, fetchSettings, updateSettings } =
    useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useRealtimeSubscription("settings", ["UPDATE"], () => {
    fetchSettings();
  });

  return {
    settings,
    loading,
    error,
    updateSettings,
  };
}
