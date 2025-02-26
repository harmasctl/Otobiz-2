import { supabase } from "./supabase";

interface AnalyticsData {
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  users: {
    total: number;
    active: number;
    new: number;
  };
  listings: {
    total: number;
    active: number;
    pending: number;
  };
}

export async function calculateAnalytics(): Promise<AnalyticsData> {
  const now = new Date();
  const dayStart = new Date(now.setHours(0, 0, 0, 0));
  const weekStart = new Date(now.setDate(now.getDate() - 7));
  const monthStart = new Date(now.setMonth(now.getMonth() - 1));
  const yearStart = new Date(now.setFullYear(now.getFullYear() - 1));

  // Get revenue data
  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount, created_at")
    .gte("created_at", yearStart.toISOString());

  // Get user data
  const { data: users } = await supabase
    .from("profiles")
    .select("status, created_at, last_sign_in_at");

  // Get listing data
  const { data: listings } = await supabase
    .from("vehicles")
    .select("status, created_at");

  const revenue = {
    daily:
      transactions
        ?.filter((t) => new Date(t.created_at) >= dayStart)
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    weekly:
      transactions
        ?.filter((t) => new Date(t.created_at) >= weekStart)
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    monthly:
      transactions
        ?.filter((t) => new Date(t.created_at) >= monthStart)
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    yearly:
      transactions
        ?.filter((t) => new Date(t.created_at) >= yearStart)
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
  };

  const activeThreshold = new Date(now.setDate(now.getDate() - 30));

  const userStats = {
    total: users?.length || 0,
    active:
      users?.filter(
        (u) =>
          u.last_sign_in_at && new Date(u.last_sign_in_at) >= activeThreshold,
      ).length || 0,
    new: users?.filter((u) => new Date(u.created_at) >= monthStart).length || 0,
  };

  const listingStats = {
    total: listings?.length || 0,
    active: listings?.filter((l) => l.status === "active").length || 0,
    pending: listings?.filter((l) => l.status === "pending").length || 0,
  };

  const data = { revenue, users: userStats, listings: listingStats };

  // Cache the results
  await supabase.from("analytics_cache").upsert({
    id: "global",
    data,
    updated_at: new Date().toISOString(),
  });

  return data;
}

export async function getCachedAnalytics(): Promise<AnalyticsData | null> {
  try {
    const { data, error } = await supabase
      .from("analytics_cache")
      .select("data")
      .eq("id", "global")
      .single();

    if (error) throw error;
    return data?.data;
  } catch (error) {
    console.error("Error getting cached analytics:", error);
    return null;
  }
}
