export async function registerServiceWorker() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration =
        await navigator.serviceWorker.register("/service-worker.js");
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  }
  return null;
}

export async function subscribeToPushNotifications() {
  try {
    const registration = await registerServiceWorker();
    if (!registration) return null;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });

    return subscription;
  } catch (error) {
    console.error("Push subscription failed:", error);
    return null;
  }
}
