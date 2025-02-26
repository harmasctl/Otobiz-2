import { supabase } from "../supabase";
import { logActivity } from "../activity";

export async function sendNotification({
  userId,
  title,
  message,
  type = "info",
  link,
}: {
  userId: string;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  link?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        title,
        message,
        type,
        link,
        read: false,
      })
      .select()
      .single();

    if (error) throw error;

    await logActivity({
      userId,
      action: "notification_sent",
      entityType: "notification",
      entityId: data.id,
      details: { title, type },
    });

    return data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

export async function sendBulkNotifications({
  userIds,
  title,
  message,
  type = "info",
  link,
}: {
  userIds: string[];
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  link?: string;
}) {
  try {
    const notifications = userIds.map((userId) => ({
      user_id: userId,
      title,
      message,
      type,
      link,
      read: false,
    }));

    const { data, error } = await supabase
      .from("notifications")
      .insert(notifications)
      .select();

    if (error) throw error;

    await logActivity({
      userId: "system",
      action: "bulk_notification_sent",
      entityType: "notification",
      details: { title, type, userCount: userIds.length },
    });

    return data;
  } catch (error) {
    console.error("Error sending bulk notifications:", error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) throw error;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);

    if (error) throw error;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}
