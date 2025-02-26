import { supabase } from "../supabase";

type EntityType = "user" | "vehicle" | "content" | "setting" | "transaction";

export async function logAudit({
  userId,
  action,
  entityType,
  entityId,
  oldValues,
  newValues,
  metadata,
}: {
  userId: string;
  action: string;
  entityType: EntityType;
  entityId?: string;
  oldValues?: any;
  newValues?: any;
  metadata?: Record<string, any>;
}) {
  try {
    const { error } = await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_values: oldValues,
      new_values: newValues,
      metadata,
      ip_address: window.clientInformation?.userAgent,
      user_agent: navigator.userAgent,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error logging audit:", error);
    throw error;
  }
}

export async function getAuditLogs({
  entityType,
  entityId,
  userId,
  startDate,
  endDate,
  limit = 50,
  offset = 0,
}: {
  entityType?: EntityType;
  entityId?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase
      .from("audit_logs")
      .select("*, user:users(id, full_name, email)")
      .order("created_at", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (entityType) query = query.eq("entity_type", entityType);
    if (entityId) query = query.eq("entity_id", entityId);
    if (userId) query = query.eq("user_id", userId);
    if (startDate) query = query.gte("created_at", startDate.toISOString());
    if (endDate) query = query.lte("created_at", endDate.toISOString());

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
}
