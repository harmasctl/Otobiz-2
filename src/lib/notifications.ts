import { supabase } from "./supabase";

type NotificationType = "info" | "success" | "warning" | "error";

export async function createNotification({
  userId,
  title,
  message,
  type = "info",
  link,
}: {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
}) {
  try {
    await supabase.from("notifications").insert({
      user_id: userId,
      title,
      message,
      type,
      link,
      read: false,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    await supabase.from("notifications").delete().eq("id", notificationId);
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
}
