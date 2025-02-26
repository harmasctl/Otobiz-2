import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRealtimeSubscription } from "@/lib/hooks/useRealtimeSubscription";
import { useApp } from "@/context/AppContext";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  link?: string;
  read: boolean;
  created_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useApp();

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  useRealtimeSubscription(
    "notifications",
    ["INSERT", "UPDATE", "DELETE"],
    () => {
      if (user) fetchNotifications();
    },
  );

  async function fetchNotifications() {
    if (!user) return;

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    }
  }

  async function markAsRead(notificationId: string) {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);
  }

  async function markAllAsRead() {
    if (!user) return;

    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
  }

  async function deleteNotification(notificationId: string) {
    await supabase.from("notifications").delete().eq("id", notificationId);
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
