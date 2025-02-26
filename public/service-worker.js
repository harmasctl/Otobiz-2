const CACHE_NAME = "otobiz-v1";
const OFFLINE_URL = "/offline.html";

const ASSETS_TO_CACHE = [
  "/",
  "/offline.html",
  "/index.html",
  "/static/css/main.css",
  "/static/js/main.js",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/favicon.ico",
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

// Push event - show notification
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "view",
        title: "View",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification("Otobiz", options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    const notificationData = event.notification.data;
    event.waitUntil(clients.openWindow(notificationData.url || "/"));
  }
});

// Sync event - handle background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-messages") {
    event.waitUntil(
      // Handle background sync
      syncMessages(),
    );
  }
});

// Background sync function
async function syncMessages() {
  try {
    const db = await openDatabase();
    const tx = db.transaction("offlineQueue", "readonly");
    const store = tx.objectStore("offlineQueue");
    const actions = await store.getAll();

    for (const action of actions) {
      try {
        await processOfflineAction(action);
        // Remove from queue after successful processing
        const deleteTx = db.transaction("offlineQueue", "readwrite");
        const deleteStore = deleteTx.objectStore("offlineQueue");
        await deleteStore.delete(action.id);
      } catch (error) {
        console.error("Error processing offline action:", error);
      }
    }
  } catch (error) {
    console.error("Error syncing messages:", error);
  }
}
