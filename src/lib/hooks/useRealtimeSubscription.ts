import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

type TableName = "vehicles" | "users" | "tickets" | "transactions";
type Event = "INSERT" | "UPDATE" | "DELETE";

export function useRealtimeSubscription(
  table: TableName,
  events: Event[],
  callback: (payload: any) => void,
) {
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          if (events.includes(payload.eventType as Event)) {
            callback(payload);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, events, callback]);
}
