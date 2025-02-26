import { supabase } from "./supabase";

type EntityType = "user" | "vehicle" | "content" | "transaction";

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
  oldValues,
  newValues,
}: {
  userId: string;
  action: string;
  entityType: EntityType;
  entityId: string;
  oldValues?: any;
  newValues?: any;
}) {
  try {
    await supabase.from("audit_logs").insert([
      {
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        old_values: oldValues,
        new_values: newValues,
        ip_address: window.clientInformation?.userAgent,
        user_agent: navigator.userAgent,
      },
    ]);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
