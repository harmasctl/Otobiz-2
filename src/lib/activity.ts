import { supabase } from "./supabase";

type ActivityType = "user" | "vehicle" | "content" | "transaction" | "system";

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
  details,
}: {
  userId: string;
  action: string;
  entityType: ActivityType;
  entityId?: string;
  details?: Record<string, any>;
}) {
  try {
    // Get user info
    const { data: user } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .single();

    // Add user info and metadata to details
    const enrichedDetails = {
      ...details,
      user: {
        id: userId,
        name: user?.full_name,
        role: user?.role,
      },
      ip_address: window.clientInformation?.userAgent,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Insert activity log
    const { error } = await supabase.from("activity_logs").insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: enrichedDetails,
    });

    if (error) throw error;

    // Notify admins of important actions
    if (entityType === "user" || action.includes("delete")) {
      const { data: admins } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "admin");

      if (admins) {
        admins.forEach((admin) => {
          // Send notification to admin
          supabase.from("notifications").insert({
            user_id: admin.id,
            title: `${action.charAt(0).toUpperCase() + action.slice(1)}`,
            message: `${user?.full_name || "A user"} ${action} a ${entityType}`,
            type: "admin",
            read: false,
          });
        });
      }
    }
  } catch (error) {
    console.error("Error logging activity:", error);
    throw error;
  }
}

export async function getRecentActivity(limit = 10) {
  try {
    const { data, error } = await supabase
      .from("activity_logs")
      .select(
        `
        *,
        user:users(id, full_name, email)
      `,
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting recent activity:", error);
    return [];
  }
}
