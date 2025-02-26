import { supabase } from "@/lib/supabase";

export async function queueOfflineAction(
  userId: string,
  action: string,
  data: any,
) {
  try {
    // Store action in IndexedDB
    const db = await openDatabase();
    const tx = db.transaction("offlineQueue", "readwrite");
    const store = tx.objectStore("offlineQueue");
    await store.add({
      userId,
      action,
      data,
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error queuing offline action:", error);
    return { success: false, error };
  }
}

export async function syncOfflineActions(userId: string) {
  try {
    const db = await openDatabase();
    const tx = db.transaction("offlineQueue", "readonly");
    const store = tx.objectStore("offlineQueue");
    const actions = await store.getAll();

    for (const action of actions) {
      if (action.userId === userId) {
        // Process action
        await processOfflineAction(action);

        // Remove from queue
        const deleteTx = db.transaction("offlineQueue", "readwrite");
        const deleteStore = deleteTx.objectStore("offlineQueue");
        await deleteStore.delete(action.id);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error syncing offline actions:", error);
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
      db.createObjectStore("offlineQueue", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("cache", { keyPath: "key" });
    };
  });
}

async function processOfflineAction(action: any) {
  // Process based on action type
  switch (action.action) {
    case "updateProfile":
      await supabase
        .from("profiles")
        .update(action.data)
        .eq("id", action.userId);
      break;
    // Add more action types as needed
  }
}
