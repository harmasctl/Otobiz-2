import { supabase } from "./supabase";

export async function cacheData(key: string, value: any, expiresIn = 3600) {
  try {
    // Store in IndexedDB for offline access
    const db = await openDatabase();
    const tx = db.transaction("cache", "readwrite");
    const store = tx.objectStore("cache");

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    await store.put({
      key,
      value,
      expiresAt: expiresAt.toISOString(),
    });

    // Also store in Supabase for sync across devices
    await supabase.from("cache_entries").upsert({
      key,
      value,
      expires_at: expiresAt.toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error caching data:", error);
    return { success: false, error };
  }
}

export async function getCachedData(key: string) {
  try {
    // Try IndexedDB first
    const db = await openDatabase();
    const tx = db.transaction("cache", "readonly");
    const store = tx.objectStore("cache");
    const data = await store.get(key);

    if (data && new Date(data.expiresAt) > new Date()) {
      return { success: true, data: data.value };
    }

    // If not in IndexedDB or expired, try Supabase
    const { data: supabaseData, error } = await supabase
      .from("cache_entries")
      .select("value, expires_at")
      .eq("key", key)
      .single();

    if (error) throw error;
    if (!supabaseData || new Date(supabaseData.expires_at) <= new Date()) {
      return { success: false, error: "Cache miss" };
    }

    // Update IndexedDB
    await cacheData(key, supabaseData.value);

    return { success: true, data: supabaseData.value };
  } catch (error) {
    console.error("Error getting cached data:", error);
    return { success: false, error };
  }
}

async function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("otobiz", 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cache")) {
        db.createObjectStore("cache", { keyPath: "key" });
      }
    };
  });
}
